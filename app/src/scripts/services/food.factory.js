angular.module('backpackPlannerApp')
  .factory('FoodFactory', ['Restangular', function(Restangular) {
    Restangular.setRestangularFields({ id: "_id" });

    var foodApi = Restangular.all('api/food');

    return {
      getAllFood: foodApi.getList(),
      createFood: function(food) {
        console.log("submitting food => " + food);
        return foodApi.post(food);
      },
      deleteFood: function(food) {
        console.log("DELETE food => " + food._id);
        return food.remove();
      }
    };
  }
]);