'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var boroughArray = ['Bronx','Brooklyn','Queens','Staten Island','Manhattan'];

var userSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    firstName: String,
    lastName: String,
    homeAddress: String,
    zip: String,
    borough: { type: String, enum: boroughArray },
    phoneNumber: String,
    admin: {
      type: Boolean,
      default: false
    },
    picture: String
}, {collection: 'users', discriminatorKey: 'type'});

// method to remove sensitive information from user objects before sending them out
userSchema.methods.sanitize =  function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

//method to check is user has pending('stillShopping') transaction
userSchema.methods.getCart = function () {
  return mongoose.model('Transction').findOne({customer: this._id, status: 'stillShopping'})
};

//userSchema.methods.addToCart = function (mealId) {
//  return mongoose.model('Transaction').findOne({customer: this._id, status: 'stillShopping'})
//  .then(function(cart){
//    return cart.addMeal(mealId)
//  })
//};

userSchema.methods.getAllTransactions = function () {
  return mongoose.model('Transaction').find({customer: this._id})
};

userSchema.methods.getAllRatingsWritten = function () {
  return mongoose.model('Rating').find({author: this._id})
}

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

userSchema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

userSchema.statics.generateSalt = generateSalt;
userSchema.statics.encryptPassword = encryptPassword;

userSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', userSchema);