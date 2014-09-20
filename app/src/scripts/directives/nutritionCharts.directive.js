angular.module('backpackPlannerApp')
.directive('nutritionCharts', function() {
  return {
    restrict: 'E',
    scope: {
      food: '=food'
    },
    templateUrl: 'views/nutrition-charts.html'
  };
});