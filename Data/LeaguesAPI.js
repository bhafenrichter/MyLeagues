import firestore, { firebase } from '@react-native-firebase/firestore';

import CacheHelper from './../utils/CacheHelper';
import Utils from './../utils/Utils';

// preferences
const GAMES_IN_LEAGUE_FEED = 5;
const GAMES_IN_HOME_FEED = 10;


const services = {
  getLeagues: async (userId) => {

    // get the leagues the user is currently in
    const currentUser = await Utils.getCurrentUser(true);

    if (currentUser.leagues.length === 0) { 
      return;
    }
    // query the leagues
    const request = firestore()
      .collection('leagues')
      .where('id', 'in', currentUser.leagues);

    return request.get().then((response) => {
      let leagues = [];
      response.forEach((doc) => {
        const league = doc;
        leagues.push(league);
      });
      return leagues;
    }).then((leagues) => {
      // grab the members subcollection
      let membersPromises = [];
      let gamesPromises = [];
      let leaguePromises = [];
      leagues.forEach((league) => {
        membersPromises.push(new Promise(function (resolve, reject) {
          league.ref.collection('members').get().then((subcollection) => {
            const members = [];
            subcollection.forEach(function (member) {
              members.push(member.data());
            });
            resolve(members);
          });
        }));
      });

      // grab the games subcollection
      leagues.forEach((league) => {
        gamesPromises.push(new Promise(function (resolve, reject) {
          league.ref.collection('games')
            .orderBy('playedOn', 'desc')
            .limit(GAMES_IN_HOME_FEED)
            .get()
            .then((subcollection) => {
              const games = [];
              subcollection.forEach(function (game) {
                games.push({
                  ...{
                    id: game.id
                  },
                  ...game.data()
                });
              });
              resolve(games);
            });
        }));
      });

      // combine the two sets of promises into one
      // wait for that promise to finish
      leaguePromises.push(Promise.all(membersPromises).then((results) => {
        return {
          members: results
        };
      }));

      leaguePromises.push(Promise.all(gamesPromises).then((results) => {
        return {
          games: results
        };
      }));

      return Promise.all(leaguePromises).then((leagueData) => {
        const memberData = leagueData[0].members;
        const gameData = leagueData[1].games;
        for (var i = 0; i < leagues.length; i++) {
          const leagueId = leagues[i].id;
          const currentGames = gameData[i];
          leagues[i] = leagues[i].data();
          leagues[i].id = leagueId;
          leagues[i].members = memberData[i];
          // add the display names from the members to the game data
          for (var j = 0; j < currentGames.length; j++) {
            currentGames[j] = getLeagueUsersForGame(currentGames[j], leagues[i]);
          }
          leagues[i].games = currentGames;
        }
        return leagues;
      });

    }).then((results) => {
      return results;
    });
  },

  getRecentGames: async (leagueId) => {
    const leagues = await CacheHelper.get(CacheHelper.LEAGUES);

    if (!leagues) { return []; }
    
    let games = [];
    for (var i = 0; i < leagues.length; i++) {
      const leagueGames = leagues[i].games;
      if (leagueId) {
        if (leagues[i].id === leagueId) {
          games = games.concat(leagueGames);
        }
      } else {
        games = games.concat(leagueGames);
      }
    }
    return games;
  },
  getLeagueGames: async (league) => {
    let games = [];

    return firestore()
      .collection('leagues')
      .doc(league.id)
      .collection('games')
      .orderBy('playedOn', 'desc')
      .limit(GAMES_IN_LEAGUE_FEED)
      .get().then((collection) => {
        collection.forEach((game) => {
          let gameData = game.data();
          gameData = getLeagueUsersForGame(gameData, league);
          games.push(gameData);
        });

        league.games = games;
        // save the new league games to the cache
        Utils.saveLeague(league).then(function () {
          return games;
        });
        return games;
      });
  },
  createLeague: async (leaguetype, name) => {
    let currentUser = await Utils.getCurrentUser();
    console.log(currentUser);
    const id = uuid();
    const leagueUser = getEmptyLeagueUser(currentUser);
    const leagueid = uuid();

    const newLeague = {
      id: leagueid,
      name: name,
      subtype: leaguetype,
      createdOn: new Date(),
    };
    
    await addLeagueToUser(currentUser.id, leagueid);

    return await createQuery('leagues', leagueid, newLeague, [{
      subcollection: 'members',
      data: [leagueUser]
    }]);
  },

  createGame: async (leagueid, userid, opponentid, userScore, opponentScore) => {
    const game = {
      homeId: userid,
      awayId: opponentid,
      homeScore: userScore,
      awayScore: opponentScore,
      playedOn: new Date(),
    }

    // get the league
    var league = await firestore()
      .collection('leagues')
      .doc(leagueid);

    // add the game to the db
    var gamePromise = league
      .collection('games')
      .doc(uuid())
      .set(game)
      .then(function () {
        console.log('game successfully written');
      });

    // update the records
    var userRecordToUpdate = userScore > opponentScore ? 'wins' : 'losses';
    var opponentRecordToUpdate = opponentScore > userScore ? 'wins' : 'losses';

    if (userScore === opponentScore) {
      userRecordToUpdate = 'ties';
      opponentRecordToUpdate = 'ties';
    }

    var opponentRecordPromise = await league
      .collection('members')
      .doc(opponentid);

    var userRecordPromise = await league
      .collection('members')
      .doc(userid);

    var opponentRecord = await opponentRecordPromise
      .get().then(function (response) {
        return response.data()[opponentRecordToUpdate];
      });

    var userRecord = await userRecordPromise
      .get().then(function (response) {
      return response.data()[userRecordToUpdate];
    });

    var userRecordPromise = userRecordPromise
      .update({[userRecordToUpdate]: userRecord + 1});

    var opponentRecordPromise = opponentRecordPromise
      .update({[opponentRecordToUpdate]: opponentRecord + 1});

    return Promise.all([userRecordPromise, opponentRecordPromise, gamePromise]).then(function () {
      console.log('all records updated');
    });
  },
  addUsersToLeague: async (users, leagueId) => {
    // add league references to user
    var userPromises = [];
    for (var i = 0; i < users.length; i++) {
      userPromises.push(addLeagueToUser(users[i].id, leagueId));
    }

    Promise.all(userPromises).then((response) => {
      console.log('users updated with league');
    });

    // add user leagues to league
    var userLeaguePromises = [];

    // add user leagues
    for (var i = 0; i < users.length; i++) {
      users[i].id = uuid();
      var emptyUser = getEmptyLeagueUser(users[i]);
      var userLeaguePromise = firestore()
        .collection('leagues')
        .doc(leagueId)
        .collection('members')
        .doc(emptyUser.id)
        .set(emptyUser);

      userLeaguePromises.push(userLeaguePromise);
    }

    Promise.all(userLeaguePromises).then((response) => {
      console.log('memebers within league updated');
    });
  },
  getUser: async (userId) => {
    return firestore()
      .collection('users')
      .doc(userId).get();
  },
  // takes in a facebook user
  createUser: async (user) => {
    var newUser = {
      firstName: user.first_name,
      lastName: user.last_name,
      profilePicture: user.picture ? user.picture.data.url : '',
      joinedOn: new Date(),
      leagues: [],
    };

    return await createQuery('users', user.id, newUser);
  },

  getMembersForLeague: async (id) => {
    return firestore()
      .collection('leagues')
      .doc(id)
      .collection('members')
      .get().then(async (response) => {
        let members = [];
        response.forEach((member) => {
          let memberData = member.data();
          members.push(memberData);
        });
        console.log(members);
        return members;
      });
  },

  getLeague: async (id, fromServer) => {
    if (!fromServer) {
      return CacheHelper.get(CacheHelper.LEAGUES).then((response) => {
  
        for (var i = 0; i < response.length; i++) {
          if (response[i].id == id) {
            return response[i];
          }
          return {};
        }
      });
    } else {
      return firestore()
        .collection('leagues')
        .doc(id).get().then(async (response) => {
          let league = response.data();
          return league;
        });
    }
  }
}

// helper methods
getLeagueUsersForGame = (game, league) => {
  const homeId = game.homeId;
  const awayId = game.awayId;
  const members = league.members;
  game.homeProfile = Utils.getUserInformation(homeId, members);
  game.awayProfile = Utils.getUserInformation(awayId, members);
  game.league = league.name;
  return game;
}

getEmptyLeagueUser = (user) => {
  return {
    id: user.id,
    firstName: user.firstName ? user.firstName : user.name.split(' ')[0],
    lastName: user.lastName ? user.lastName : user.name.split(' ')[1],
    wins: 0,
    losses: 0,
    ties: 0,
    userid: user.id,
    joinedOn: new Date(),
    profilePicture: user.picture ? user.picture.data.url : '',
  };
}

uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

createQuery = async (collection, id, obj, subcollections) => {
  if (!id) {
    // generate id
    id = uuid();
  }

  let query = firestore().collection(collection)
    .doc(id)
    .set(obj)
    .then(function () {
      console.log(collection + " successfully written!");
    })
    .then(function () {
      // push the sub collections to the document as well
      if (subcollections) {
        for (var i = 0; i < subcollections.length; i++) {
          let current = subcollections[i];

          for (var j = 0; j < current.data.length; j++) {
            let subcollectionData = current.data[j];
            let subcollectionDocId = uuid();
            console.log('writing ' + JSON.stringify(subcollectionData));
            return firestore().collection(collection).doc(id).collection(current.subcollection).doc(subcollectionDocId).set(subcollectionData).then(function () {
              console.log(subcollections[i].subcollection + " subcollection successfully written!");
            });
          }

        }
      }
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      return null;
    });
}

addLeagueToUser = async (userid, leagueid) => {
  return firestore()
    .collection('users')
    .doc(userid)
    .update({
      leagues: firebase.firestore.FieldValue.arrayUnion(leagueid)
    }).then(function () {
      console.log('league added!');
    })
},

module.exports = services;