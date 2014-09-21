angular.module('backpackPlannerApp')
.factory('FoodService', ['$resource', function($resource) {
    return $resource('api/food/:foodId', {}, {
      query: {
        method: 'GET',
        params: {
          foodId: 'food'
        },
        isArray: true
      }
    });
  }
]);