var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

var Promise = require('bluebird'); 

// Require in all models.
require('../../../server/db/models');

var app = require('../../../server/app');

var Transaction = mongoose.model('Transaction');
var Meal = mongoose.model('Meal');

describe('Transaction model', function () {

	beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Transaction).to.be.a('function');
    });

    describe('Validate', function() {
    	var transaction;
    	beforeEach(function() {
    		transaction = new Transaction({
    			status: 'notAValidStatus'
    		});
    	})

    	it('errors if status is not valid', function(done) {
    		console.log('i am running')
    		transaction.validate(function(err) {
    			expect(err.errors.status).to.be.an('object');
    			done()
    		})
    		// .then(null, done) // Not sure why this doesn't work with .then?
    	})

    })


    describe('Transaction Functions', function() {
    	var meal1, meal2;
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

    	var transaction;
    	beforeEach(function(done) {
    		Transaction.create({
    			meals: [meal1, meal2]
	    	})
	    	.then(function(newTrans) {
	    		transaction = newTrans;
	    		done()
	    	})
	    	.then(null, done)    
	    });


		it('should remove a meal from a transaction when .removeMeal is called', function(done) {
			transaction.removeMeal(meal1._id)
			.then(function() {
				expect(transaction.meals.length).to.equal(1);
				done();
			})
			.then(null,done);
		});

		it('should add a meal from a transaction when .addMeal is called', function(done) {
			transaction.addMeal(meal1)
			.then(function() {
				expect(transaction.meals.length).to.equal(3);
				done();
			})
			.then(null,done);
		});


    });
});



















