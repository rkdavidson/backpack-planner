angular.module('backpackPlannerApp')
  .controller('MainController', ['$scope', 'Restangular', function($scope, Restangular) {

    $scope.rkd = 'rkdAAAasssfsfsfsfjlhhjhjhjhjhj';
    $scope.message = 'Look at me gooooo!';

    var foodApi = Restangular.all('api/food');

    // This will query /accounts and return a promise.
    foodApi.getList().then(function(foods) {
      $scope.foods = foods;
      console.log("Got foods from server => " + $scope.foods);
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