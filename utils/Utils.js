export default {
  getDisplayName: (firstName, lastName) => {
    return firstName[0] + '. ' + lastName;
  },
  getFirebaseDate(date) {
    return date ? new Date(date._seconds * 1000).toLocaleDateString() : new Date().toLocaleDateString();
  }
}