
var chalk = require('chalk');
var Promise = require('bluebird');
var mongoose = require('mongoose');
// sballan Actually not needed in Mongoose 4.0
Promise.promisifyAll(mongoose)
var startDbPromise = require('./server/db')

var Chef = mongoose.model('Chef');
var Meal = mongoose.model('Meal'); // ???
var chance = require('chance')(123);
var _ = require('lodash');

var numChefs = 5;
var numMeals = 20;
var specialty = ['Indian', 'Vegetarian', 'Italian', 'French', 'American', 'Barbequeue', 'Mediterrenean', 'Brazilian', 'Spanish', 'Chinese', 'Japanese'];

var diets = ['none', 'vegan', 'vegetarian', 'gluten-free', 'diary-free'];
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

function mealPop(num) {
    var result = []
    for(var i = 0; i < num; i++) {
        // sballan Pop twice? Pop removes and returns the last item.
        allMeals.pop()
        result.push(allMeals.pop());
    }
    return result;
}

function randChef() {
    // sballan Consider Chef.create()
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
        specialty: chance.pickone(specialty),
        bio:  chance.paragraph(),
        rating: chance.integer({min: 1, max: 5}),
        // meals: _.times(randNumber, allMeals.pop())
        meals: mealPop(randNumber)
    });
}

// Storing url's of random meal photos form pixabay
// I change meals photo type from buffer to string, is it okay to use string instead of buffer? TO DO: add more pictures
var mealPhotos = [
'https://pixabay.com/static/uploads/photo/2015/04/08/13/14/food-712667_960_720.jpg',
'https://pixabay.com/static/uploads/photo/2015/04/10/00/41/food-715539_960_720.jpg',
'https://pixabay.com/static/uploads/photo/2015/04/10/00/41/food-715542_960_720.jpg'
 ];

function randMeal() {
    // sballan is numPars being used?
    var numPars = chance.natural({
        min: 3,
        max: 20
    });

    return new Meal({
          name: chance.word(),
          cuisine: chance.pickone(specialty),
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
        return randChef(generateAllMeals());
    });
   return chefs;

}

// function generateAll() {
//     var meals = _.times(numMeals, function () {
//         return randMeal();
//     });

//     Meal.create(meals) //returns array of meals
//     .then(function(meals) {
//         var chefs = _.times(numChefs, function() {
//             return randChef(meals);
//         });
//         console.log('CHEFS:', chefs)
//           //returns a chef with meals array populated
//         return chefs.concat(meals);
//     })
// }

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
        // sballan Cannot return two things in JavaScript; did you mean return Promise.all()?

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
