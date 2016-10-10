var app = angular.module("sampleApp", ["firebase"]);

// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

// and use it in our controller
app.controller("SampleCtrl", ["$scope", "Auth",
  function($scope, Auth, $firebaseArray) {
    $scope.auth = Auth;

    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      // Create a new user
      Auth.$createUserWithEmailAndPassword($scope.email, $scope.password, $scope.name)
        .then(function(firebaseUser) {
          $scope.message = "User created with uid: " + firebaseUser.uid;
          const uid = firebaseUser.uid;
          const dbref = firebase.database().ref().child('users/'+uid);
          const userInst = {}
          dbref.update({id:uid, info: {name: $scope.name}});
        }).catch(function(error) {
          $scope.error = error;
        });
    };

    $scope.deleteUser = function() {
      $scope.message = null;
      $scope.error = null;

      $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
    });

      // Delete the currently signed-in user
      Auth.$deleteUser().then(function() {
        $scope.message = "User deleted";
      }).catch(function(error) {
        $scope.error = error;
      });
    };
  }
]);
