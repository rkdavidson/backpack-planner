// Setup
// =============================================================================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');


// Mongo + Express Config
// =============================================================================

mongoose.connect('mongodb://localhost:27017/backpackplanner'); // connect to our database
var Food = require('./app/src/mongo/food.schema.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

var port = process.env.PORT || 8080;    // set our port


// Routes :: Application
// =============================================================================

app.get('/', function(req, res) {
  res.sendfile('./app/views/index.html');
});


// Routes :: API
// =============================================================================

var router = express.Router();        // get an instance of the express Router

// Request catch-all for api
router.use(function(req, res, next) {
  console.log('Request received.');
  next(); // make sure we go to the next routes and don't stop here
});

// :: api/ root route
router.get('/', function(req, res) {
  res.json({ message: 'backpack-planner api root' });
});


// Routes :: Food
// =============================================================================

router.route('/food')

  // Create new Food
  // --- POST :: /food
  .post(function(req, res) {

    var food = new Food();    // create a new instance of the Food model
    food.name = req.body.name;  // set the foods name (comes from the request)
    console.log(req.body);

    // save the food and check for errors
    food.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Food created! ' + food.name, foodObject: food });
    });

  })

  // All Foods
  // --- GET :: /food
  .get(function(req, res) {
    Food.find(function(err, foods) {
      if (err)
        res.send(err);

      res.json(foods);
    });
  });

// -------------------------------------------------------

// Food actions
router.route('/food/:food_id')

  // --- GET
  .get(function(req, res) {
    Food.findById(req.params.food_id, function(err, food) {
      if (err)
        res.send(err);

      console.log("looking up specific food :: " + req.params.food_id);
      res.json(food);
    })
  })

  // --- PUT
  .put(function(req, res) {

    Food.findById(req.params.food_id, function(err, food) {

      if (err)
        res.send(err);

      food.name = req.body.name;  // update the foods info

      // save the food
      food.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Food name updated to => ' + food.name });
      });

    });
  })

  // --- DELETE
  .delete(function(req, res) {
      Food.remove({
        _id: req.params.food_id
      }, function(err, food) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted food' });
      });
    });



// Start server
// =============================================================================

app.use('/api', router);
app.listen(port);
console.log('Listening on port :: ' + port);