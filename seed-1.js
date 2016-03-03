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








