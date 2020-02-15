import firestore from '@react-native-firebase/firestore';

import CacheHelper from './../utils/CacheHelper';
import Utils from './../utils/Utils';

const services = {
  getLeagues: async (userId) => {  
    const request = firestore()
      .collection('leagues');

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
        membersPromises.push( new Promise (function (resolve, reject) {
          league.ref.collection('members').get().then((subcollection) => {
            const members = [];
            subcollection.forEach(function (member) {
              members.push( {...{id: member.id}, ...member.data()});
            });
            resolve(members);
          });
        }));
      });

      // grab the games subcollection
      leagues.forEach((league) => {
        gamesPromises.push( new Promise (function (resolve, reject) {
          league.ref.collection('games').get().then((subcollection) => {
            const games = [];
            subcollection.forEach(function (game) {
              games.push({...{id: game.id}, ...game.data()});
            });
            resolve(games);
          });
        }));
      });

      // combine the two sets of promises into one
      // wait for that promise to finish
      leaguePromises.push(Promise.all(membersPromises).then((results) => {
        return {members: results};
      }));

      leaguePromises.push(Promise.all(gamesPromises).then((results) => {
        return {games: results};
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
            const currentGame = currentGames[j];
            const homeId = currentGame.homeId;
            const awayId = currentGame.awayId;
            currentGame.homeProfile = Utils.getUserInformation(homeId, memberData[i]);
            currentGame.awayProfile = Utils.getUserInformation(awayId, memberData[i]);
          }

          leagues[i].games = currentGames;
        }
        return leagues;
      });

    }).then((results) => {
      return results;
    });
  },
  
  getLeague: async (id) => {
    return CacheHelper.get(CacheHelper.LEAGUES).then((response) => {
      
      for (var i = 0; i < response.length; i++) {
        if (response[i].id == id) {
          return response[i];
        }
        return {};
      }
    });
  },
  getRecentGames: (userId) => {
    const testData = '[{ "id": "1", "league": "Alpha Alpha", "homeTeam": "B. Hafenrichter", "awayTeam": "B. Horncastle", "homeScore": "52", "awayScore": "40", "createdOn": "4/10/2019" }, { "id": "2", "league": "Alpha Alpha", "awayTeam": "B. Hafenrichter", "homeTeam": "B. Horncastle", "homeScore": "2", "awayScore": "1", "createdOn": "4/13/2019" }, { "id": "3", "league": "Alpha Alpha", "awayTeam": "B. Hafenrichter", "homeTeam": "B. Horncastle", "homeScore": "20", "awayScore": "43", "createdOn": "4/15/2019" }, { "id": "4", "league": "Alpha Alpha", "awayTeam": "B. Hafenrichter", "homeTeam": "B. Horncastle", "homeScore": "20", "awayScore": "43", "createdOn": "4/15/2019" }]';

    return JSON.parse(testData);
  },
  getLeagueGames: async (leagueId) => {
    let games = [];
    const request = firestore()
      .collection('games')
      .where('leagueId', '==', leagueId);

    return request.get().then((collection) => {
      collection.forEach((game) => {
        games.push(game.data());
      });
      return games;
    });
  },
  getLeaguesForSearch: (search) => {
    const testData = '[{ "id": "1", "name": "FIFA 20", "count": "12" }, { "id": "2", "name": "FIFA 19", "count": "20" }, { "id": "3", "name": "Madden 20", "count": "34" }, { "id": "4", "name": "Madden 19", "count": "2" } ]';
    return JSON.parse(testData);
  },
  getUsersForSearch: (search) => {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        const testData = '[{ "id": "1", "name": "Brandon Hafenrichter" }, { "id": "4", "name": "Connor Hafenrichter" }, { "id": "2", "name": "Brian Horncastle" }, { "id": "3", "name": "Graham Lehman" } ]';
        resolve(JSON.parse(testData));
      }, 300);
    });
  },
  createLeague: async (leaguetype, name) => {
    const currentUser = await Utils.getCurrentUser();
    const leagueUser = getEmptyLeagueUser(currentUser);

    const newLeague = {
      name: name,
      subtype: leaguetype,
      createdOn: new Date(),
    };


    return await createQuery('leagues', null, newLeague, [ {
      subcollection: 'members',
      data: [leagueUser]
    }]);
  }, 
  addUsersToLeague: (users, leagueId) => {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        const testData = '{ "id": "50", "name": "FIFA 20", "count": "12" }';
        resolve(JSON.parse(testData));
      }, 300);
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
    };
  
    return await createQuery('users', user.id, newUser);
  }
}

// helper methods

getEmptyLeagueUser = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    wins: 0,
    losses: 0,
    ties: 0,
    userid: user.id,
    joinedOn: new Date(),
  };
}

uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
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
    .then(function() {
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
  .catch(function(error) {
      console.error("Error writing document: ", error);
      return null;
  });
}

module.exports = services;
