'use strict';

/**
 * @ngdoc function
 * @name jmtFoodPlannerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jmtFoodPlannerApp
 */
angular.module('jmtFoodPlannerApp')
  .controller('MainCtrl', ['$scope', '$log', 'Items', function ($scope, $log, Items) {
    $scope.$log = $log;
    $scope.gridOptions = { data: 'foodData' };

    Items.then( function(parsedData) {
        $scope.foodData = parsedData;
    });

  }])
  .factory('Items', ['$http', '$q', function($http, $q) {
    var Url = 'data/food-v1.json';

    var ItemsDefer = $q.defer();
    $http.get(Url).then( function(response) {
       ItemsDefer.resolve( response.data );
    });

    return ItemsDefer.promise;
  }]);
