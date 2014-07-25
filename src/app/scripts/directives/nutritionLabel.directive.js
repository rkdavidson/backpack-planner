'use strict';

angular.module('backpackPlannerApp')
.directive('nutritionLabel', function() {
  return {
    restrict: 'E',
    scope: {
      food: '=food'
    },
    templateUrl: 'views/nutrition-label.html'
  };
});