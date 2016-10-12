(function(){
  var app = angular.module("app", ["firebase", "ui.router"]);
  var config = {
    apiKey: "AIzaSyCX7riZcW1Ci4pIZfmFbImb8sVm7KeWwxY",
    authDomain: "fms-awesome-ang.firebaseapp.com",
    databaseURL: "https://fms-awesome-ang.firebaseio.com",
    storageBucket: "fms-awesome-ang.appspot.com",
    messagingSenderId: "414305262565"
  };
  firebase.initializeApp(config);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state("login", {
      controller: "AuthCtrl",
      templateUrl: "./Templates/login.html",
      url: "/auth",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
    })
    .state("dashboard", {
      controller: "DashCtrl",
      templateUrl: "Templates/dashboard.html",
      url: "/dashboard",
      resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireSignIn();
        }]
      }
    });
});
app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

// and use it in our controller
app.controller("AuthCtrl", ["$scope", "Auth", "$rootScope", '$state',
  function($scope, Auth, $rootScope, $state, $stateProvider) {
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
          dbref.update({
            id:uid,
            info: {
              name: $scope.name,
              recipes: {recipe : {ingredients :{}, description: ''}},
              groceryLists:{ listOne: ['']},
              fridges: {fridge: ['']}
            }

          });
          $state.go('dashboard')
        }).catch(function(error) {
          $scope.error = error;
        });
    };
  $scope.signIn = function(){
    Auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function(firebaseUser){
      console.log(firebaseUser.uid);
      $state.go('dashboard')
    })
    .catch(function(error) {

      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }
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
    $scope.new = true;
    $scope.showNew = function(){
      $scope.new = !$scope.new
    }
    $scope.returning = true;
    $scope.showReturning = function(){
      $scope.returning = !$scope.returning;
    }
  }
]);
app.controller("DashCtrl", function($scope, $firebaseObject, $firebaseArray, $firebaseAuth){
    var uid = firebase.auth().currentUser.uid;
    var dbref = firebase.database().ref().child('users').child(uid).child('info');
    var data1 = $firebaseObject(dbref.child('recipes'));
    var c;
    $scope.data = $firebaseObject(dbref);
    $scope.name = $scope.data.name;
    $scope.recipeName;
    $scope.fridges = $scope.data.fridges;
    $scope.test = function(){
      console.log($scope.fridges);
    }
    $scope.addIngredient = function(input){
      var ingredient = dbref.child('recipes').child(input).child('ingredients');
      ingredient.update($scope.ingredientNew)
      console.log(ingredient.length);
      return c += 1;
    }
    $scope.createRecipe = function(){
      var recipeName = $scope.recipeName;
      data1[recipeName] = {ingredients :[''], description: ''}
      data1[recipeName].ingredients = [
        $scope.ingredient,
        $scope.ingredient1,
        $scope.ingredient2,
        $scope.ingredient3,
        $scope.ingredient4,
        $scope.ingredient5,
        $scope.ingredient6,
        $scope.ingredient7,
        $scope.ingredient8,
        $scope.ingredient9,
        $scope.ingredient10,
        $scope.ingredient11,
        $scope.ingredient12,
        $scope.ingredient13,
        $scope.ingredient14,
        $scope.ingredient15,
        $scope.ingredient16,
      ];
      data1[recipeName].description = $scope.description;
      data1.$save()
    }
    $scope.createList = function(){
      var data2 = $firebaseObject(dbref.child('groceryLists'));
      var gName= $scope.gName;
      data2[gName] = {listItems: ['']}
      data2[gName].listItems = [
        $scope.gItem1,
        $scope.gItem2,
        $scope.gItem3,
        $scope.gItem4,
        $scope.gItem5,
        $scope.gItem6,
        $scope.gItem7,
        $scope.gItem8,
        $scope.gItem9,
        $scope.gItem10,
        $scope.gItem11,
        $scope.gItem12,
        $scope.gItem13,
        $scope.gItem14,
        $scope.gItem15,
        $scope.gItem16,
        $scope.gItem17,
        $scope.gItem18,
        $scope.gItem19,
        $scope.gItem20
      ];
      data2.$save()
    }
    $scope.createFridge = function(){
      var data2 = $firebaseObject(dbref.child('fridges'));
      var fName= $scope.fName;
      data2[fName] = {listItems: ['']}
      data2[fName].listItems = [
        $scope.fItem1,
        $scope.fItem2,
        $scope.fItem3,
        $scope.fItem4,
        $scope.fItem5,
        $scope.fItem6,
        $scope.fItem7,
        $scope.fItem8,
        $scope.fItem9,
        $scope.fItem10,
        $scope.fItem11,
        $scope.fItem12,
        $scope.fItem13,
        $scope.fItem14,
        $scope.fItem15,
        $scope.fItem16,
        $scope.fItem17,
        $scope.fItem18,
        $scope.fItem19,
        $scope.fItem20
      ];
      data2.$save()
    }
  });
}());
