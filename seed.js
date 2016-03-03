
var chalk = require('chalk');
var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose)
var startDbPromise = require('./server/db')

var Chef = mongoose.model('Chef');
var Meal = mongoose.model('Meal'); // ???
var chance = require('chance')(123);
var _ = require('lodash');

var numChefs = 5;
var numMeals = 20;
var cuisine = ['Italian','Indian','French', 'Mediterrenean', 'Brazilian', 'Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food', 'Spanish'];

var specialty = ['Italian','Indian','French', 'Mediterrenean', 'Brazilian', 'Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food', 'Spanish', 'Vegetarian', 'Pastry', 'Deserts'];

var diets = ['Vegetarian','Vegan','Paleo','Gluten-free','Kosher','Halal', 'None', 'Dairy-free'];
var borough = ['Bronx','Brooklyn','Queens','Staten Island','Manhattan'];

var tags = specialty.concat(diets);

var emails = chance.unique(chance.email, numChefs);
var allMeals = [];
var randNumber = chance.integer({min: 1, max: 5})

// Random User photo
function randUserPhoto () {
    var g = chance.pick(['men', 'women']);
    var n = chance.natural({
        min: 0,
        max: 96
    });
    return 'http://api.randomuser.me/portraits/thumb/' + g + '/' + n + '.jpg'
}

function randChef() {
    return new Chef({
        email: emails.pop(),
        password: chance.word(),
        firstName: chance.first(), 
        lastName: chance.last(),
        homeAddress: chance.address(),
        zip: chance.areacode(),
        borough: chance.pickone(borough),
        phoneNumber: chance.phone(),
        admin: chance.weighted([true, false], [5, 95]),
        picture: randUserPhoto(),
        specialty: chance.pickone(specialty),
        bio:  chance.paragraph()
        meals: [allMeals.pop(), allMeals.pop(), allMeals.pop(), allMeals.pop()]
    });
}

// Storing url's of random meal photos form pixabay
// I change meals photo type from buffer to string, is it okay to use string instead of buffer? TO DO: add more pictures
// dmoore - I added paths to actual images on our server
var mealPhotos = [
'images/steak_dinner_300x300.jpg',
'images/cheeses_selection_300x300.jpg',
'images/green_capsicum_300x300.jpg'
 ];

function randMeal() {
    var numPars = chance.natural({
        min: 3,
        max: 20
    });
    return new Meal({
          name: chance.word(),
          cuisine: chance.pickone(cuisine),
          description: chance.paragraph(),
          photo: chance.pickone(mealPhotos),
          price: chance.integer({min: 10, max: 200}),
          diet: chance.pickone(diets),
          tags: chance.pickset(tags, chance.integer({min: 1, max: 5})),
          servings: chance.integer({min: 1, max: 10})
    })
}

function generateAllMeals() {
    var meals = _.times(numMeals, function () {
        return randMeal();
    });
    meals.forEach(function(meal) {
        allMeals.push(meal._id);
    })
   return meals;
}

function generateAllChefs() {
    var chefs = _.times(numChefs, function() {
        return randChef();
    }); 
   return chefs;

}

function seedMeals() {
    var docs = generateAllMeals();
    return Promise.map(docs, function(doc) {
        return doc.save();
    })
}

function seedChefs() {
    var docs = generateAllChefs();
    return Promise.map(docs, function(doc) {
        return doc.save();
    })
}

startDbPromise
.then(function(db){
    db.drop = Promise.promisify(db.db.dropDatabase.bind(db.db));
    db.drop()
    .then(function () {
        console.log('database successfully dropped, about to seed')
        return Promise.all([
            seedMeals(), 
            seedChefs()
        ])
    })
    .then(function () {
        console.log('Seeding successful');
    }, function (err) {
        console.error('Error while seeding');
        console.error(err.stack);
    })
    .then(function () {
        process.exit();
    });
})
