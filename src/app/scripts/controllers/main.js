'use strict';

/**
 * @ngdoc function
 * @name jmtFoodPlannerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jmtFoodPlannerApp
 */
angular.module('jmtFoodPlannerApp')
  .controller('MainCtrl', ['$scope', '$log', 'Foods', function ($scope, $log, Foods) {
    $scope.$log = $log;
    $scope.foodGridOptions = {
      data: 'foodData',
      columnDefs: [
        { field: 'category', displayName: 'Category', minWidth: 90, width: 'auto'  },
        { field: 'description', displayName: 'Description', minWidth: 200, width: 'auto' },
        { field: 'brand', displayName: 'Brand', minWidth: 200, width: 'auto' },
        { field: 'size', displayName: 'Size', minWidth: 90, width: 'auto' },
        { field: 'ounces', displayName: 'Weight (oz)', minWidth: 80, width: 'auto' },
        { field: 'water', displayName: 'H2O' },
        { field: 'calories', displayName: 'Cals' },
        { field: 'protein', displayName: 'Protein' },
        { field: 'carbs', displayName: 'Carbs' },
        { field: 'fat', displayName: 'Fat' },
        { field: 'fiber', displayName: 'Fiber', maxWidth: 40, width: 'auto' },
        { field: 'calsPerCup', displayName: 'Cals/Cup' },
        { field: 'calsPerOunce', displayName: 'Cals/Oz' }
      ],
      rowTemplate: 'views/grid/foodRow.html',
      rowHeight: 24,
      showFilter: true,
      showGroupPanel: true,
      enableHighlighting: true,
      enableRowSelection: false,
      enableColumnHeavyVirt: true,
      sortInfo: { fields: ['category', 'description'], directions: ['asc' || 'desc'] },
      groups: ['category'],
      groupsCollapsedByDefault: false
    };

    Foods.then( function(parsedData) {
        $scope.foodData = parsedData;
    });

    // -----------------------------------------

    $scope.analyzedRow = null;
    $scope.rowAnalysis = {};

    $scope.analyzeRow = function(row) {
      $scope.analyzedRow = row;
      $scope.rowAnalysis = getMacronutrientAnalysis(row.entity);
      $scope.macronutrientPieData = [
        { key: "Protein", y: row.entity.protein },
        { key: "Carbs", y: row.entity.carbs },
        { key: "Fat", y: row.entity.fat }
      ];
    }

    // Return an object summarizing the macronutrient breakdown of a given food item.
    // Returns percentages and raw quantities
    function getMacronutrientAnalysis(food) {
      var totalGrams = food.protein + food.carbs + food.fat;
      var proteinCals = food.protein * 4;
      var carbsCals = food.carbs * 4;
      var fatCals = food.fat * 9;

      // Final analysis
      return {
        totalGrams: totalGrams,
        calsFromProtein: Math.round(proteinCals),
        calsFromCarbs: Math.round(carbsCals),
        calsFromFat: Math.round(fatCals),
        percentProtein: Math.round((food.protein / totalGrams) * 100),
        percentCarbs: Math.round((food.carbs / totalGrams) * 100),
        percentFat: Math.round((food.fat / totalGrams) * 100),
        totalCals: proteinCals + carbsCals + fatCals
      };
    };

    var macronutrientColors = ['#FF4000', '#BBEE00', '#33AAFF', '#FF00FF']; // Protein, Carbs, Fat, ??
    $scope.macronutrientColorFunction = function() {
      return function(d, i) {
          return macronutrientColors[i];
        };
    }

    $scope.xFunctionPie = function() {
        return function(d) {
            return d.key;
        };
    };

    $scope.yFunctionPie = function() {
      return function(d) {
        return d.y;
      };
    };

  }])
  .factory('Foods', ['$http', '$q', function($http, $q) {
    var foodDataURL = 'data/food-v1.json';

    var FoodsDefer = $q.defer();
    $http.get(foodDataURL).then( function(response) {
       FoodsDefer.resolve( response.data );
    });

    return FoodsDefer.promise;
  }]);
