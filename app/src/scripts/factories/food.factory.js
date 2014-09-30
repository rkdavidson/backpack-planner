angular.module('backpackPlannerApp')
.factory('FoodFactory', ['Restangular', function(Restangular) {
    return {
      getAllFood: foodApi.getList()
    };
  }
]);