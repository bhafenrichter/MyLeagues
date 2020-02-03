import CacheHelper from './CacheHelper';
import LeagueAPI from './../Data/LeaguesAPI';

export default {
  getDisplayName: (firstName, lastName) => {
    return firstName[0] + '. ' + lastName;
  },
  getFirebaseDate(date) {
    return date ? new Date(date._seconds * 1000).toLocaleDateString() : new Date().toLocaleDateString();
  },
  getCurrentUser() {
    return CacheHelper.get(CacheHelper.CURRENTUSER).then((cachedUser) => {
      if (cachedUser) {
        return cachedUser;
      } else {
        return LeagueAPI.getUser('oeCzlQS1DUSlfqai4HAP').then((response) => {
          CacheHelper.set(CacheHelper.CURRENTUSER, response.data());
          return response.data();
        }); 
      }
    });
  }
}