import CacheHelper from './CacheHelper';
import LeagueAPI from './../Data/LeaguesAPI';

export default {
  getDisplayName: (firstName, lastName) => {
    if (firstName && lastName) {
      return firstName.substring(0,1) + '. ' + lastName;
    }
    return '';
  },

  getFirebaseDate(date) {
    return date ? new Date(date._seconds * 1000).toLocaleDateString() : new Date().toLocaleDateString();
  },

  getCurrentUser(hardRefresh) {
    return CacheHelper.get(CacheHelper.CURRENTUSER).then((cachedUser) => {
      if (cachedUser) {
        const id = cachedUser.id;
        if (hardRefresh === true) {
          LeagueAPI.getUser(cachedUser.id).then(function(response) {
            let user = {...{id: id}, ...response.data()};
            console.log(user);
            CacheHelper.set(CacheHelper.CURRENTUSER, user);
            return response;
          });
        }
        return cachedUser;
      } 
      return null;
    });
  },

  async getCurrentLeagueUser(members) {
    const currentUser = await this.getCurrentUser();
    console.log(members);
    console.log(currentUser);
    for (var i = 0; i < members.length; i++) {
      if (members[i].userid === currentUser.id) {
        return members[i];
      }
    }
    return null;
  },

  getUserInformation(userid, members) {
    console.log(members);
    for (var i = 0; i < members.length; i++) {
      const current = members[i];
      if (current.id === userid) {
        return {
          firstName: current.firstName,
          lastName: current.lastName,
          profilePicture: current.profilePicture,
          wins: current.wins,
          losses: current.losses
        };
      }
    }
    return {};
  }, 

  async saveLeague(league) {
    const leagues = await CacheHelper.get(CacheHelper.LEAGUES);

    for (var i = 0; i < leagues.length; i++) {
      if (leagues[i].id === league.id) {
        console.log('updating league');
        leagues[i] = league;
        console.log(leagues[i]);
      }
    }

    return await CacheHelper.set(CacheHelper.LEAGUES, leagues);
  }
}