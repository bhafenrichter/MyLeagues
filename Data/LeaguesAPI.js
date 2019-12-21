const services = {
  getLeagues: (userId) => {
    const testData = '[{ "id": "0", "name": "Alpha Alpha Madden", "friends": "Brandon, Brian, and 4 more..." }, { "id": "1", "name": "Alpha Alpha Madden", "friends": "Brandon, Brian, and 4 more..." }, { "id": "2", "name": "Alpha Alpha FIFA", "friends": "Brandon, Brian, and 4 more..." }, { "id": "3", "name": "Alpha Alpha 2k", "friends": "Brandon, Brian, and 4 more..." } ]';

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
}
module.exports = services;
