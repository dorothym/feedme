
var chalk = require('chalk');
var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose)
var startDbPromise = require('./server/db')

var Chef = mongoose.model('Chef');
var Meal = mongoose.model('Meal'); // ???
var chance = require('chance')(123);
var _ = require('lodash');
// var Chef = require('./server/db/models/chef.js')
// var Meal = require('./server/db/models/meal.js')

var numChefs = 100;
var numMeals = 500;
var specialty = ['Indian', 'Vegetarian', 'Italian', 'French', 'American', 'Barbequeue', 'Mediterrenean', 'Brazilian', 'Spanish', 'Chinese', 'Japanese'];

var emails = chance.unique(chance.email, numChefs);

// Random User photo
function randUserPhoto () {
    var g = chance.pick(['men', 'women']);
    var n = chance.natural({
        min: 0,
        max: 96
    });
    return 'http://api.randomuser.me/portraits/thumb/' + g + '/' + n + '.jpg'
}

// Currently each chef has only one meal, need to change
function randChef(allMeals) {
    var meal = chance.pick(allMeals);
    return new Chef({
        email: emails.pop(),
        password: chance.word(),
        firstName: chance.first(), 
        lastName: chance.last(),
        homeAddress: chance.address(),
        zip: chance.areacode(),
        phoneNumber: chance.phone(),
        admin: chance.weighted([true, false], [5, 95]),
        picture: randUserPhoto(),
        transactions: [], 
        specialty: specialty[Math.random() * specialty.length-1],
        bio:  chance.paragraph(),
        rating: chance.integer({min: 1, max: 5}),
        meals: _.times(chance.integer({min: 1, max: 10}), meal)
    });
}
// Storing url's of random meal photos form pixabay
var mealPhotos = [
'https://pixabay.com/static/uploads/photo/2015/04/08/13/14/food-712667_960_720.jpg',
'https://pixabay.com/static/uploads/photo/2015/04/10/00/41/food-715539_960_720.jpg',
'https://pixabay.com/static/uploads/photo/2015/04/10/00/41/food-715542_960_720.jpg'
 ];

var diets = ['none', 'vegan', 'vegetarian', 'gluten-free', 'diary-free'];

// Generating random meal
function randMeal() {
    var numPars = chance.natural({
        min: 3,
        max: 20
    });
    return new Meal({
          cuisine: specialty[Math.random() * specialty.length-1],
          description: chance.paragraph(),
          photo: randMealPhoto(mealPhotos),
          price: chance.integer({min: 10, max: 200}),
          diet: diets[Math.random() * specialty.length-1],
          tags: [],
          servings: chance.integer({min: 1, max: 10})
    })
}
// Generating random meal photo
function randMealPhoto(allMealPhotos) {
    return allMealPhotos[Math.random() * allMealPhotos.length-1]
}

function generateAll() {
    var meals = _.times(numMeals, function () {
        return randMeal();
    });
    var chefs = _.times(numChefs, function() {
        return randChef(meals)
    });
    return chefs.concat(meals);
}

function seed() {
    var docs = generateAll();
    return Promise.map(docs, function(doc) {
        return doc.save();
    })
}


// console.log('connect', connectToDb)


startDbPromise
.then(function(db){
    db.drop = Promise.promisify(db.db.dropDatabase.bind(db.db));
    db.drop()
    .then(function () {
        console.log('database successfully dropped, about to seed')
        return seed();
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

// -- Manual seeding

// var mongoose = require('mongoose');
// var Promise = require('bluebird');
// var chalk = require('chalk');
// var connectToDb = require('./server/db');
// var Chef = Promise.promisifyAll(mongoose.model('Chef'));


// var seedChefs = function () {

//     var chefs = [
//         {
//             email: 'testing@fsa.com',
//             password: 'password'
//         },
//         {
//             email: 'obama@gmail.com',
//             password: 'potus'
//         }
//     ];

//     return Chef.createAsync(chefs);

// };

// connectToDb.then(function () {
//     Chef.findAsync({}).then(function (chefs) {
//         if (users.length === 0) {
//             return seedChefs();
//         } else {
//             console.log(chalk.magenta('Seems to already be user data, exiting!'));
//             process.kill(0);
//         }
//     }).then(function () {
//         console.log(chalk.green('Seed successful!'));
//         process.kill(0);
//     }).catch(function (err) {
//         console.error(err);
//         process.kill(1);
//     });
// });




