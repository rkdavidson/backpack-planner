angular.module('backpackPlannerApp')
.controller('FoodFormCreateController', ['$scope', '$timeout', 'FoodFactory', function($scope, $timeout, FoodFactory) {

  $scope.newFood = {}; // Object that will be submitted

  $scope.refreshFoods = function() {
    console.log("REFRESH FOODS");
    FoodFactory.getAllFood.then(function(foods) {
      $scope.foods = foods;
    });
  };
  $scope.refreshFoods();

  $scope.submitFood = function() {
    console.log("Submitting food => ");
    console.log($scope.newFood);
    FoodFactory.createFood($scope.newFood);

    $timeout($scope.refreshFoods, 1500);
  };
}]);