/**
 * @ngdoc overview
 * @name backpackPlannerApp
 * @description
 * # backpackPlannerApp
 *
 * Main module of the application.
 */
angular.module('backpackPlannerApp', [
  'ui.router',
  'restangular',
  'ngGrid'
]).config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/food");

  $stateProvider
    .state('food', {
      url: "/food",
      templateUrl: "views/food/food-list.html"
    })
    .state('food-create', {
      url: "/food/create",
      templateUrl: "views/food/food-create.html"
    });
});
