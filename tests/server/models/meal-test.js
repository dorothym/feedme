var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var app = require('../../../server/app');

var Meal = mongoose.model('Meal');

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

        beforeEach(function(done) {
          newMeal = new Meal({
            name:  'Vegetable Lasagna',
            cuisine: 'Italian',
            description: 'A savory dish from southern Italy, with fresh summer vegtables',
            price: 10,
            diet: 'Vegetarian',
            servings: 2
          });
          newMeal.save(done);
        });

        afterEach(function () {
            cryptoStub.restore();
        });

        it('should successfully create a meal', function(done){
        Meal.find()
        .then(function(data){
          expect(data).to.have.length(1);
          expect(data[0].cuisine).to.equal('Italian');
          expect(data[0].servings).to.equal(2);
          done();
        })
        .then(null, done);

        });
    });
});