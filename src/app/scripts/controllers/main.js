'use strict';

/**
 * @ngdoc function
 * @name backpackPlannerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the backpackPlannerApp
 */
angular.module('backpackPlannerApp')
  .controller('MainCtrl', ['$scope', '$log', 'Foods', function ($scope, $log, Foods) {
    $scope.$log = $log;

    $scope.selectedFoodItems = [];
    $scope.selectedFoodRow = null;
    $scope.selectedFood = null;
    $scope.compareFoodRow = null;
    $scope.compareFood = null;

    $scope.mouseoverRow = function(row) {
      $scope.compareFoodRow = row;
      $scope.compareFood = row.entity;
    }

    $scope.foodGridConfig = {
      data: 'foodData',
      columnDefs: [
        { field: 'category', displayName: 'Category', width: 0, visible: false },
        { field: 'description', displayName: 'Description', cellClass: 'descriptionCell', minWidth: 170, width: 'auto' },
        { field: 'brand', displayName: 'Brand', cellClass: 'brandCell', minWidth: 190, width: 'auto' },
        { field: 'size', displayName: 'Size', cellClass: 'sizeCell', minWidth: 95, width: 'auto' },
        { field: 'ounces', displayName: 'Weight', cellClass: 'weightCell', cellTemplate: 'views/grid/foodRowOunceCell.html' },
        { field: 'water', displayName: 'H2O', cellClass: 'waterCell', maxWidth: 50, width: 'auto' },
        { field: 'calories', displayName: 'Cals', cellClass: 'caloriesCell', minWidth: 80, width: 'auto' },
        { field: 'protein', displayName: 'Protein', cellClass: 'proteinCell', cellTemplate: 'views/grid/foodRowGramCell.html', minWidth: 90, width: 'auto' },
        { field: 'analysis.percentProtein', displayName: '%', cellClass: 'proteinCell percentCell', cellTemplate: 'views/grid/foodRowPercentCell.html'},
        { field: 'carbs', displayName: 'Carbs', cellClass: 'carbsCell', cellTemplate: 'views/grid/foodRowGramCell.html', minWidth: 90, width: 'auto' },
        { field: 'analysis.percentCarbs', displayName: '%', cellClass: 'carbsCell percentCell', cellTemplate: 'views/grid/foodRowPercentCell.html', },
        { field: 'fat', displayName: 'Fat', cellClass: 'fatCell', cellTemplate: 'views/grid/foodRowGramCell.html', minWidth: 90, width: 'auto' },
        { field: 'analysis.percentFat', displayName: '%', cellClass: 'fatCell percentCell', cellTemplate: 'views/grid/foodRowPercentCell.html' },
        { field: 'calsPerCup', displayName: 'Cals/Cup', cellClass: 'calsPerCupCell' },
        { field: 'calsPerOunce', displayName: 'Cals/Oz', cellClass: 'calsPerOunceCell' }
      ],
      rowTemplate: 'views/grid/foodRow.html',
      rowHeight: 30,
      showFilter: true,
      enableHighlighting: true,
      enableRowSelection: true,
      multiSelect: false,
      keepLastSelected: true,
      enableColumnHeavyVirt: true,
      sortInfo: { fields: ['category', 'description'], directions: ['asc' || 'desc'] },
      groups: ['category'],
      groupsCollapsedByDefault: false,
      afterSelectionChange: function(row, event) {
        $scope.selectedFoodRow = row;
        $scope.selectedFood = row.entity;
        $log.log($scope.selectedFood);
      }
    };

    Foods.then( function(parsedData) {
      // Loop through and add the analysis for all food items upfront
      for (var i = parsedData.length - 1; i >= 0; i--) {
        parsedData[i].analysis = getMacronutrientAnalysis(parsedData[i]);
        parsedData[i].charts = getFoodChartData(parsedData[i]);
      };

      $scope.foodData = parsedData;
    });

    // -----------------------------------------

    // Return an object summarizing the macronutrient breakdown of a given food item.
    // Returns percentages and raw quantities
    function getMacronutrientAnalysis(food) {
      var totalGrams = food.protein + food.carbs + food.fat;
      var proteinCals = food.protein * 4;
      var carbsCals = food.carbs * 4;
      var fatCals = food.fat * 9;

      // Final analysis
      return {
        totalGrams: totalGrams || 0,
        calsFromProtein: Math.round(proteinCals) || 0,
        calsFromCarbs: Math.round(carbsCals) || 0,
        calsFromFat: Math.round(fatCals) || 0,
        percentProtein: Math.round((food.protein / totalGrams) * 100) || 0,
        percentCarbs: Math.round((food.carbs / totalGrams) * 100) || 0,
        percentFat: Math.round((food.fat / totalGrams) * 100) || 0,
        totalCals: proteinCals + carbsCals + fatCals || 0
      };
    };

    function getFoodChartData(food) {
      return {
        macronutrientPieData: [
          { key: "P", y: food.protein },
          { key: "C", y: food.carbs },
          { key: "F", y: food.fat }
        ],
        caloriesMassPieData: [
          { key: "Volume", y: food.calsPerCup },
          { key: "Weight", y: food.calsPerOunce }
        ]
      };
    }

    var macronutrientColors = ['#FF4000', '#AAD600', '#33AAFF', '#FF00FF']; // Protein, Carbs, Fat, ??
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

  }]);
