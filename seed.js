
var chalk = require('chalk');
var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose)
var startDbPromise = require('./server/db')

var Chef = mongoose.model('Chef');
var Meal = mongoose.model('Meal'); 
var Transaction = mongoose.model('Transaction'); 
var Rating = mongoose.model('Rating'); 
var chance = require('chance')(123);
var _ = require('lodash');


// change the number of generated documents here:
// NOTE: number of meals and chefs should always be 4:1 (as it is populated now 4 meals per 1 chef)
var numChefs = 5;
var numMeals = 20;
// All transactions are currently under 1 user. See comment below to add users.
var numTransactions = 5;
var numRatings = 10;
var cuisine = ['Italian','Indian','French', 'Mediterrenean', 'Brazilian', 'Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food', 'Spanish'];

var specialty = ['Italian','Indian','French', 'Mediterrenean', 'Brazilian', 'Thai','New American','Chinese','Japanese','Vietnamese','Mexican','Peruvian','Food truck','Sandwiches','Pub food', 'Spanish', 'Vegetarian', 'Pastry', 'Desserts'];

var diets = ['Vegetarian','Vegan','Paleo','Gluten-free','Kosher','Halal', 'None', 'Dairy-free'];
var borough = ['Bronx','Brooklyn','Queens','Staten Island','Manhattan'];

var emails = chance.unique(chance.email, numChefs);
// allMeals array for populating Chef's schema. 
var allMeals = [];
var randNumber = chance.integer({min: 1, max: 5})


var mealsFT = [];

// add customers that need transactions here
var customersFT = ["56dba9f9ccbb8a3412f3013f"];
var transactionStatus = ['On the Way', 'Delivered', 'stillShopping', 'Processing'];

var mealsFR = [];

// add customers that will review products here:
var customersFR = ["56dba9f9ccbb8a3412f3013f"];

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
        bio:  chance.paragraph(),
        meals: [allMeals.pop(), allMeals.pop(), allMeals.pop(), allMeals.pop()]
    });
}

// Storing url's of random meal photos form pixabay
// I change meals photo type from buffer to string, is it okay to use string instead of buffer? TO DO: add more pictures
// dmoore - I added paths to actual images on our server
var mealPhotos = [
'https://static.pexels.com/photos/5938/food-salad-healthy-lunch.jpg', 
'https://static.pexels.com/photos/2215/food-salad-healthy-vegetables.jpg'


// 'images/steak_dinner_300x300.jpg',
// 'images/cheeses_selection_300x300.jpg',
// 'images/green_capsicum_300x300.jpg'
 ];

function randMeal() {
    var numPars = chance.natural({
        min: 3,
        max: 20
    });
    return new Meal({
          name: chance.word(),
          cuisine: chance.pickone(cuisine),
          description: chance.sentence(),
          photo: chance.pickone(mealPhotos),
          price: chance.integer({min: 10, max: 200}),
          diet: chance.pickone(diets),
          servings: chance.integer({min: 1, max: 10})
    })
}

function randTransaction() {
    return new Transaction({
        customer: chance.pickone(customersFT),
        status: chance.pickone(transactionStatus),
        meals: [mealsFT.pop(), mealsFT.pop(), mealsFT.pop()]
    })
}

function randRating() {
    return new Rating({
        meal: chance.pickone(mealsFR),
        rating: chance.integer({min: 1, max: 5}),
        ratingText: chance.sentence(),
        author: chance.pickone(customersFR),
    })
}

function generateAllMeals() {
    var meals = _.times(numMeals, function () {
        return randMeal();
    });
    meals.forEach(function(meal) {
        allMeals.push(meal._id);
        mealsFT.push(meal._id);
        mealsFR.push(meal._id);
    })
   return meals;
}

function generateAllChefs() {
    var chefs = _.times(numChefs, function() {
        return randChef();
    }); 

    chefs.push(new Chef({
        _id: "56dba9f9ccbb8a3412f3013f",
        firstName: 'Alice',
        lastName: 'Wang',
        picture: 'https://www.google.com/imgres?imgurl=http://weknowyourdreamz.com/images/woman/woman-09.jpg&imgrefurl=http://weknowyourdreamz.com/woman.html&h=3744&w=5616&tbnid=A4EbzVhtr6zujM:&docid=SEM5c0cUKN4f-M&ei=n4DfVrjdGYuSauCyi-gH&tbm=isch&ved=0ahUKEwj4qIKDvrLLAhULiRoKHWDZAn0QMwgxKAIwAg',
        phone: '(510) 295-5523',
        email: 'alice@gmail.com',
        password: '123',
        admin: true
    }));

   return chefs;
}

function generateAllTransactions() {
    var transactions = _.times(numTransactions, function() {
        return randTransaction();
    }); 
   return transactions;
}

function generateAllRatings() {
    var ratings = _.times(numRatings, function() {
        return randRating();
    }); 
   return ratings;
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

function seedTransactions() {
    var docs = generateAllTransactions();
    return Promise.map(docs, function(doc) {
        return doc.save();
    })
}

function seedRatings() {
    var docs = generateAllRatings();
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
            seedChefs(), 
            seedTransactions(), 
            seedRatings()
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
