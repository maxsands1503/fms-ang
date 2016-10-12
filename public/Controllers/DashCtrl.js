app.controller("DashCtrl", function($scope, $firebaseObject, $firebaseArray, $firebaseAuth){
    var uid = firebase.auth().currentUser;
    var ref = firebase.database().ref.child('users')

    $scope.test = function(){
      console.log(uid);
    }
  }
);
