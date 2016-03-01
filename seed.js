var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
// var User = Promise.promisifyAll(mongoose.model('User')); // ???
var chance = require('chance')(123);
var _ = require('lodash');
var User = require('./server/db/models/user.js')
// require all the models
// var Transaction = require('./server/db/models/transaction.js')
// var Rating = require('./server/db/models/rating.js')
// var Meal = require('./server/db/models/meal.js')

// Instantiating chance:
// var chance = new Chance();

var numChefs = 100;
var numMeals = 500;
var specialty = ['Indian', 'Vegetarian', 'Italian', 'French', 'American', 'Barbequeue', 'Mediterrenean', 'Brazilian', 'Spanish', 'Chinese', 'Japanese'];
var emails = chance.unique(chance.email, numUsers);

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
        homeAddress: chance.areacode(),
        zip: chance.integer({min: 10000, max: 99999}),
        phoneNumber: chance.phone(),
        admin: chance.weighted([true, false], [5, 95])
        picture: randUserPhoto(),
        // transactions: {type: Schema.Types.ObjectId, ref: 'Transaction'}, 
        specialty: specialty[Math.random() * specialty.length-1],
        bio:  chance.paragraph(),
        rating: chance.integer({min: 1, max: 5})
    });
}
// Storing url's of random meal photos form pixabay
var mealPhotos = [
'https://pixabay.com/static/uploads/photo/2015/04/08/13/14/food-712667_960_720.jpg',
'https://pixabay.com/static/uploads/photo/2015/04/10/00/41/food-715539_960_720.jpg',
'https://pixabay.com/static/uploads/photo/2015/04/10/00/41/food-715542_960_720.jpg'
 ];

// Generating random meal
function randMeal(allChefs) {
    name: chance.word(),
    var chef = chance.pick(allChefs);
    var numPars = chance.natural({
        min: 3,
        max: 20
    });
    return new Meal({
        photo: randMealPhoto(mealPhotos),

    })
}
// Generating random meal photo
function randMealPhoto(allMealPhotos) {
    return allMealPhotos[Math.random() * allMealPhotos.length-1]
}

function generateAll() {
    var chefs = _times.(numChefs, randChefs);
}

function seed() {
    var docs = generateAll();
    return Promise.man(docs, function(docs) {
        return doc.save();
    })
}

connectToDb.drop = Promise.promisify(connectToDb.connectToDb.dropDatabase.bind(connectToDb.connectToDb));

connectToDb.on('open', function () {
    conn.drop()
    .then(function () {
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
});

// NOTES:
// Include in html
// <!– Load Chance –>
// <script type=“text/javascript” src=“node_modules/chance/chance.js”></script>

