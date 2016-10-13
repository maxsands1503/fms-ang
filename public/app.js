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
    .state('home', {
      controller: 'AuthCtrl',
      templateUrl: './Templates/home.html',
      url: '/',
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
              name: $scope.name
              // recipes: {name: '', ingredients :[''], description: ''},
              // groceryLists: {name: '', listItems: ['']},
              // fridges: {name: '', inventory: ['']},
              // savedRecipes: {name: '', url: ''}
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
app.controller("DashCtrl", function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, $http, $firebase) {
    $scope.gItem1 = '';
    // $scope.gItem2 = '';
    // $scope.gItem3 = '';
    // $scope.gItem4 = '';
    // $scope.gItem5 = '';
    // $scope.gItem6 = '';
    // $scope.gItem7 = '';
    // $scope.gItem8 = '';
    // $scope.gItem9 = '';
    // $scope.gItem10 = '';
    // $scope.gItem11 = '';
    // $scope.gItem12 = '';
    // $scope.gItem13 = '';
    // $scope.gItem14 = '';
    // $scope.gItem15 = '';
    // $scope.gItem16 = '';
    // $scope.gItem17 = '';
    // $scope.gItem18 = '';
    // $scope.gItem19 = '';
    // $scope.gItem20 = '';
    // $scope.ingredient = '';




    // $scope.fItem1 = '';
    // $scope.fItem2 = '';
    // $scope.fItem3 = '';
    // $scope.fItem4 = '';
    // $scope.fItem5 = '';
    // $scope.fItem6 = '';
    // $scope.fItem7 = '';
    // $scope.fItem8 = '';
    // $scope.fItem9 = '';
    // $scope.fItem10 = '';
    // $scope.fItem11 = '';
    // $scope.fItem12 = '';
    // $scope.fItem13 = '';
    // $scope.fItem14 = '';
    // $scope.fItem15 = '';
    // $scope.fItem16 = '';
    // $scope.fItem17 = '';
    // $scope.fItem18 = '';
    // $scope.fItem19 = '';
    // $scope.fItem20 = '';
    // $scope.fItem21 = '';
    // $scope.fItem22 = '';
    // $scope.fItem23 = '';
    // $scope.fItem24 = '';
    // $scope.fItem25 = '';
    // $scope.fItem26 = '';
    // $scope.fItem27 = '';
    // $scope.fItem28 = '';
    // $scope.fItem29 = '';
    // $scope.fItem30 = '';
    // $scope.fItem31 = '';
    // $scope.fItem32 = '';
    // $scope.fItem33 = '';
    // $scope.fItem34 = '';
    // $scope.fItem35 = '';
    // $scope.fItem36 = '';
    // $scope.fItem37 = '';
    // $scope.fItem38 = '';
    // $scope.fItem39 = '';
    // $scope.fItem40 = '';
    // $scope.fItem41 = '';
    // $scope.fItem42 = '';
    // $scope.fItem43 = '';
    // $scope.fItem44 = '';
    // $scope.fItem45 = '';
    // $scope.fItem46 = '';
    // $scope.fItem47 = '';
    // $scope.fItem48 = '';
    // $scope.fItem49 = '';
    // $scope.fItem50 = '';

    var uid = firebase.auth().currentUser.uid;
    var dbref = firebase.database().ref().child('users').child(uid).child('info');
    var data1 = $firebaseObject(dbref.child('recipes'));
    $scope.gLists =  $firebaseObject(dbref.child('groceryLists'));
    $scope.mySaves = $firebaseObject(dbref.child('savedRecipes'));
    $scope.data = $firebaseObject(dbref);
    $scope.name = $scope.data.name;
    $scope.recipeName;
    $scope.fridges = $firebaseObject(dbref.child('fridges'));
    // $scope.test = function(){
    //   console.log($scope.recipes);
    // }
    // $scope.addIngredient = function(input){
    //   var ingredient = dbref.child('recipes').child(input).child('ingredients');
    //   ingredient.update($scope.ingredientNew)
    //   console.log(ingredient.length);
    //   return c += 1;
    // }
    $scope.createRecipe = function(){
      var ingredient = $scope.ingredient;
      var recipeName = $scope.recipeName;
      data1[recipeName] = {name: '', ingredients :{}, description: ''}

      data1[recipeName].name = $scope.recipeName;
      data1[recipeName].description = $scope.description
      data1[recipeName].ingredients[ingredient]= $scope.ingredient;
      data1[recipeName].description = $scope.description;
      data1.$save()
    }
    var data2 = $firebaseObject(dbref.child('groceryLists'));
    $scope.createList = function(){
      var gName= $scope.gName;
      var gItem1 = $scope.gItem1;
      data2[gName] = {name: '', listItems: {}};
      data2[gName].name = $scope.gName;
      data2[gName].listItems[gItem1] = $scope.gItem1;
      data2.$save()
    }
    var data3 = $firebaseObject(dbref.child('fridges'));

    $scope.createFridge = function(){
      var fName= $scope.fName;
      var fItem1 = $scope.fItem1;
      data3[fName] = {name: '', inventory: {}};
      data3[fName].name = $scope.fName;
      data3[fName].inventory[fItem1] = $scope.fItem1;
        // $scope.fItem2,
        // $scope.fItem3,
        // $scope.fItem4,
        // $scope.fItem5,
        // $scope.fItem6,
        // $scope.fItem7,
        // $scope.fItem8,
        // $scope.fItem9,
        // $scope.fItem10,
        // $scope.fItem11,
        // $scope.fItem12,
        // $scope.fItem13,
        // $scope.fItem14,
        // $scope.fItem15,
        // $scope.fItem16,
        // $scope.fItem17,
        // $scope.fItem18,
        // $scope.fItem19,
        // $scope.fItem20,
        // $scope.fItem21,
        // $scope.fItem22,
        // $scope.fItem23,
        // $scope.fItem24,
        // $scope.fItem25,
        // $scope.fItem26,
        // $scope.fItem27,
        // $scope.fItem28,
        // $scope.fItem29,
        // $scope.fItem30,
        // $scope.fItem31,
        // $scope.fItem32,
        // $scope.fItem33,
        // $scope.fItem34,
        // $scope.fItem35,
        // $scope.fItem36,
        // $scope.fItem37,
        // $scope.fItem38,
        // $scope.fItem39,
        // $scope.fItem40,
        // $scope.fItem41,
        // $scope.fItem42,
        // $scope.fItem43,
        // $scope.fItem44,
        // $scope.fItem45,
        // $scope.fItem46,
        // $scope.fItem47,
        // $scope.fItem48,
        // $scope.fItem49,
        // $scope.fItem50

      //
      data3.$save()
    };

    $scope.recipes = $firebaseObject(dbref.child('recipes'));
    $scope.searchRecipes = function() {
      $http({
        async: true,
        crossDomain: true,
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=' + $scope.searchItem1 + '%2C+' + $scope.searchItem2 + '%2C+' + $scope.searchItem3 + '&limitLicense=false&number=500&ranking=1',
        headers: {
          'x-mashape-key': "BoF3698DNWmshq8rQDe66ihjafNxp1KIlCKjsnaQPlKrkeGbjD",
          'cache-control': "no-cache",
          'postman-token': "8bfdc072-2d9a-fae9-fecb-294451dc51a3"
      }}).then(function(response) {
    if (response) {
      console.log(response.data);
        $scope.hHeck=response.data;
    } else {
      console.log("shit");
    }
      })
    };
    $scope.getRecipe = function(clicked){
      $http({
        async: true,
        crossDomain: true,
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + clicked + '/information?includeNutrition=true',
        headers: {
          'x-mashape-key': "BoF3698DNWmshq8rQDe66ihjafNxp1KIlCKjsnaQPlKrkeGbjD",
          'cache-control': "no-cache",
          'postman-token': "8bfdc072-2d9a-fae9-fecb-294451dc51a3"
      }}).then(function(response) {
    if (response) {
      console.log(response.data);
      $scope.specific = response.data
    } else {
      console.log("shit");
    }
      })
    }
    var data4 = $firebaseObject(dbref.child('savedRecipes'));
    $scope.saveRecipe = function(name, url){
    data4[name] = {name: name, url: url};
    data4.$save();
    }
    var poop = $firebaseObject(dbref.child('recipes').child(':/id').child('ingredients'));


    $scope.editIngredient = function(id, item, newItem){
      poop = $firebaseObject(dbref.child('recipes/' + id + '/ingredients/' + item));
        poop.$value = newItem
        console.log(poop);
        poop.$save();

    }
    $scope.newIngredient = function(id, newItem){
      poop = $firebaseObject(dbref.child('recipes/' + id + '/ingredients/' + newItem));
      poop.$value = newItem;
      poop.$save();
    }
    var butt = $firebaseObject(dbref.child('groceryLists').child('listItems').child(':/id'));
    $scope.addItem = function(id, newItem){
      butt = $firebaseObject(dbref.child('groceryLists/' + id + '/listItems/' + newItem));
      butt.$value = newItem;
      butt.$save();
    }
    var lol = $firebaseObject(dbref.child('fridges').child(':/id').child('inventory'));
  $scope.addInven = function(id, newItem){
    lol = $firebaseObject(dbref.child('fridges/' + id + '/inventory/' + newItem));
    lol.$value = newItem;
    lol.$save();
  }
  })
}());
