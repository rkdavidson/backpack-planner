angular.module('backpackPlannerApp')
.controller('MainController', ['$scope', '$timeout', '$log', 'FoodFactory', function($scope, $timeout, $log, FoodFactory) {

  FoodFactory.getAllFood.then(function(foods) {
    $scope.foods = foods;

  });

  $scope.foodGridOptions =  {
    data: 'foods',
    columnDefs: [
      {
        field: '_id',
        displayName: 'id'
      },
      {
        field: 'name',
        displayName: 'Name'
      }
    ]
  };
}]);