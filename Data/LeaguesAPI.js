const services = {
  getLeagues: (userId) => {
    const testData = '[{ "id": "0", "name": "Alpha Alpha Madden", "friends": [{ "id": "1", "name": "Brandon Hafenrichter" }, { "id": "4", "name": "Connor Hafenrichter" }, { "id": "2", "name": "Brian Horncastle" }, { "id": "3", "name": "Graham Lehman" } ] }, { "id": "1", "name": "Alpha Alpha Madden", "friends": [{ "id": "1", "name": "Brandon Hafenrichter" }, { "id": "4", "name": "Connor Hafenrichter" }, { "id": "2", "name": "Brian Horncastle" }, { "id": "3", "name": "Graham Lehman" } ] }, { "id": "2", "name": "Alpha Alpha FIFA", "friends": [{ "id": "1", "name": "Brandon Hafenrichter" }, { "id": "4", "name": "Connor Hafenrichter" }, { "id": "2", "name": "Brian Horncastle" }, { "id": "3", "name": "Graham Lehman" } ] }, { "id": "3", "name": "Alpha Alpha 2k", "friends": [{ "id": "1", "name": "Brandon Hafenrichter" }, { "id": "4", "name": "Connor Hafenrichter" }, { "id": "2", "name": "Brian Horncastle" }, { "id": "3", "name": "Graham Lehman" } ] } ]';

    return JSON.parse(testData);
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
  }
}
module.exports = services;
