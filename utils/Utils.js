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

  getCurrentUser() {
    return CacheHelper.get(CacheHelper.CURRENTUSER).then((cachedUser) => {
      if (cachedUser) {
        return cachedUser;
      } 
      // else {
      //   return LeagueAPI.getUser('oeCzlQS1DUSlfqai4HAP').then((response) => {
      //     CacheHelper.set(CacheHelper.CURRENTUSER, response.data());
      //     return response.data();
      //   }); 
      // }
      return null;
    });
  },

  async getCurrentLeagueUser(members) {
    const currentUser = await this.getCurrentUser();

    for (var i = 0; i < members.length; i++) {
      if (members[i].userid === currentUser.id) {
        return members[i];
      }
    }
  },

  getUserInformation(userid, members) {
    for (var i = 0; i < members.length; i++) {
      const current = members[i];
      if (current.id === userid) {
        return {
          firstName: current.firstName,
          lastName: current.lastName,
          profilePicture: current.profilePicture,
        };
      }
    }
    return {};
  }
}