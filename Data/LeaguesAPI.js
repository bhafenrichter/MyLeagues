import firestore from '@react-native-firebase/firestore';

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
      let promises = [];
      leagues.forEach((league) => {
        promises.push( new Promise (function (resolve, reject) {
          league.ref.collection('members').get().then((subcollection) => {
            const members = [];
            subcollection.forEach(function (member) {
              members.push(member.data());
            });
            resolve(members);
          });
        }));
      });

      return Promise.all(promises).then((results) => {
        for (var i = 0; i < results.length; i++) {
          leagues[i] = leagues[i].data();
          leagues[i].members = results[i];
        }
        return leagues;
      });
    }).then((results) => {
      console.log(results);
      return results;
    });
  },
  
  getLeague: (id) => {
    const testData = '';

    return JSON.parse(testData);
  },
  getRecentGames: (userId) => {
    const testData = '[{ "id": "1", "league": "Alpha Alpha", "homeTeam": "B. Hafenrichter", "awayTeam": "B. Horncastle", "homeScore": "52", "awayScore": "40", "createdOn": "4/10/2019" }, { "id": "2", "league": "Alpha Alpha", "awayTeam": "B. Hafenrichter", "homeTeam": "B. Horncastle", "homeScore": "2", "awayScore": "1", "createdOn": "4/13/2019" }, { "id": "3", "league": "Alpha Alpha", "awayTeam": "B. Hafenrichter", "homeTeam": "B. Horncastle", "homeScore": "20", "awayScore": "43", "createdOn": "4/15/2019" }, { "id": "4", "league": "Alpha Alpha", "awayTeam": "B. Hafenrichter", "homeTeam": "B. Horncastle", "homeScore": "20", "awayScore": "43", "createdOn": "4/15/2019" }]';

    return JSON.parse(testData);
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
  createLeague: (leaguetype, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        const testData = '{ "id": "50", "name": "FIFA 20", "count": "12" }';
        resolve(JSON.parse(testData));
      }, 300);
    });
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
    const request = firestore()
      .collection('users')
      .where('id', '==', userId);
    
    const response = runQuery(request);

    return response;
  },
}

module.exports = services;
