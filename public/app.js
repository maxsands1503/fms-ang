(function(){
  var config = {
    apiKey: "AIzaSyCX7riZcW1Ci4pIZfmFbImb8sVm7KeWwxY",
    authDomain: "fms-awesome-ang.firebaseapp.com",
    databaseURL: "https://fms-awesome-ang.firebaseio.com",
    storageBucket: "fms-awesome-ang.appspot.com",
    messagingSenderId: "414305262565"
  };
  firebase.initializeApp(config);

  angular
  .module('app', ['firebase'])
  .controller('MyController', function($firebaseObject){
    const rootRef = firebase.database().ref().child('angular');
    const ref = rootRef.child('object');
    this.object = $firebaseObject(ref);
  });
}());
