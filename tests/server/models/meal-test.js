var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

var Promise = require('bluebird'); 

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

    describe('Validate meal', function() {
        var meal
        beforeEach(function() {
            meal = new Meal();
        })

        it('errors without required fields', function(done) {
            meal.validate(function(err) {
                expect(err.errors.name).to.be.an('object');
                expect(err.errors.price).to.be.an('object');
                expect(err.errors.description).to.be.an('object');
                done();
            })
        })

    })

    describe('Create a meal', function () {

        var newMeal;

        // use done with error first callbacks 
        beforeEach(function(done) {
          newMeal = new Meal({
            name:  'Vegetable Lasagna',
            cuisine: 'Italian',
            description: 'A savory dish from southern Italy, with fresh summer vegtables',
            price: 10,
            diet: 'Vegetarian',
            servings: 2
          });
          newMeal.save(function(err, meal){
            if (err) return done(err)
            else done()
          });

        });


        // // use done with promises 
        // beforeEach(function(done) {
        //    Meal.create({
        //     name:  'Vegetable Lasagna',
        //     cuisine: 'Italian',
        //     description: 'A savory dish from southern Italy, with fresh summer vegtables',
        //     price: 10,
        //     diet: 'Vegetarian',
        //     servings: 2
        //     })
        //     .then(function(){
        //         done()
        //     })
        //     .then(null, done)
        // });



        // // // return promise pattern 
        // beforeEach(function() {
        //   return Meal.create({
        //     name:  'Vegetable Lasagna',
        //     cuisine: 'Italian',
        //     description: 'A savory dish from southern Italy, with fresh summer vegtables',
        //     price: 10,
        //     diet: 'Vegetarian',
        //     servings: 2
        //   });

        // });

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

         var chef1,chef2, meal1, meal2
        beforeEach(function(done) {

           Promise.all([
                Meal.create({
                    name: 'Awesome chicken meal',
                    cuisine: 'Indian',
                    description: 'An amazing dish',
                    price: 8,
                    servings: 1
                  }), 
                Meal.create({
                    name: 'Lasagna',
                    cuisine: 'Italian',
                    description: 'A savory dish from southern Italy, with fresh summer vegtables',
                    price: 10,
                    diet: 'Vegetarian',
                    servings: 2
                  })
            ])
           .spread(function(_meal1, _meal2){
                meal1 = _meal1
                meal2 = _meal2
                done()
           })
           .then(null, done)

        })

        beforeEach(function(done){
            Chef.create({
                email: 'chef1@gmail.com',
                password: '123',
                firstName: 'Frank',
                lastName: 'Chef',
                borough: 'Queens',
                specialty: 'Indian',
                bio: 'Please eat my food!',
                meals: [meal1, meal2]
            })
            .then(function(){
                done()
            })
            .then(null, done)
        })


        it('should return chef associated with a meal ID', function(done){
            meal1.getChef()
            .then(function(chef){
                console.log("inside .then returning chef")
              expect(chef.firstName).to.equal('Frank');
              done();
            })
            .then(null, done);

        });

    });



});

