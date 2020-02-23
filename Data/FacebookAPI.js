
export default {
  getFriends() {
    return FB.api(
      '/me',
      'GET',
      {"fields":"friends"},
      function(response) {
          // Insert your code here
          console.log(response);
          return response;
      }
    );
  }
}