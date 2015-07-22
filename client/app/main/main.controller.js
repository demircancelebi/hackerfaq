'use strict';

angular.module('hackerfaqApp')
  .controller('MainCtrl', function ($http, $scope) {
    $scope.question = {};
    $scope.askLabel = 'ASK';
    $scope.question.answer = 'There be answers';

    $scope.ask = function (e) {
      if(e) {
        e.preventDefault();
      }
      $scope.askLabel = 'THINKING...';

      $http.post('/api/questions', $scope.question).success(function (data) {
        $scope.question.answer = data;
        $scope.askLabel = 'ASK';
      }).error(function (err) {
        console.log(err);
        $scope.question.answer = 'Sorry, something went wrong!';
      });
    };

    $scope.fillAndAsk = function (q) {
      $scope.question.question = q;
      $scope.ask();
    };

  });
