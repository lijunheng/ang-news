'use strict';

app.controller('AuthCtrl', function ($scope, $location, Auth, User) {
  if (Auth.signedIn()) {
    $location.path('/');
  }

  $scope.$on('$firebaseSimpleLogin:login', function() {
    $location.path('/');
  });

  $scope.login = function () {
    Auth.login($scope.user).then(function () {
      $location.path('/');
    }, function (error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function () {
    console.log($scope.user);
    Auth.register($scope.user).then(function (authUser) {
      Auth.login($scope.user);
      console.log(authUser);
      User.create(authUser, $scope.user.username);
      $location.path('/');
    }, function (error) {
      $scope.error = error.toString();
    });
  };
});