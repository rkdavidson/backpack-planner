'use strict';

angular.module('backpackPlannerApp')
.factory('Foods', ['$http', '$q', function($http, $q) {
  var foodDataURL = 'data/food-v1.json';

  var FoodsDefer = $q.defer();
  $http.get(foodDataURL).then( function(response) {
     FoodsDefer.resolve( response.data );
  });

  return FoodsDefer.promise;
}]);