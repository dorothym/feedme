var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var app = require('../../../server/app');

var Meal = mongoose.model('Meal');
var Chef = mongoose.model('Chef');
var User = mongoose.model('User');

describe('Meal model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Meal).to.be.a('function');
    });

    describe('Create a meal', function () {

        var newMeal;

        before(function(done) {
          newMeal = new Meal({
            name:  'Vegetable Lasagna',
            cuisine: 'Italian',
            description: 'A savory dish from southern Italy, with fresh summer vegtables',
            price: 10,
            diet: 'Vegetarian',
            servings: 2
          });
          return newMeal.save(done);
        });


        it('should successfully create a meal', function(done){
            return Meal.find()
            .then(function(data){
              expect(data).to.have.length(1);
              expect(data[0].cuisine).to.equal('Italian');
              expect(data[0].servings).to.equal(2);
              done();
            })
            .then(null, done);
        });
    });

     describe('getChef method', function () {

        before(function(done) {
            var meal1,meal2,
                chef1,chef2;

                Meals = [

              {
                name: 'Awesome chicken meal',
                cuisine: 'Indian',
                description: 'An amazing dish',
                price: 8,
                servings: 1
              },

              {
                name: 'Lasagna',
                cuisine: 'Italian',
                description: 'A savory dish from southern Italy, with fresh summer vegtables',
                price: 10,
                diet: 'Vegetarian',
                servings: 2
              }
            ]

            return Meal.create(Meals)
            .then(function (mealArray) {
                console.log("line 92", mealArray)
                 return Chef.create({
                    email: 'chef1@gmail.com',
                    password: '123',
                    firstName: 'Frank',
                    lastName: 'Chef',
                    borough: 'Queens',
                    specialty: 'Indian',
                    bio: 'Please eat my food!',
                    meals: [mealArray[0]._id, mealArray[1]._id]
                });
              });
        });

        it('should return chef associated with a meal ID', function(done){
            meal1.getChef()
            .then(function(chef){
                console.log("inside .then returning chef")
              expect(chef).firstName.to.equal('Frank');
              done();
            })
            .then(null, done);

        });

    });



});

