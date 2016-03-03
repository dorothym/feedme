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
    // sballan Consider which of these services you want to support
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
    zip: Number,
    borough: {type: String, enum: boroughArray },
    phoneNumber: Number,
    admin: {
      type: Boolean,
      default: false
    },
    picture: String,
    transactions: [{type: Schema.Types.ObjectId, ref: 'Transaction'}]
}, {collection: 'users', discriminatorKey: 'type'});

// method to remove sensitive information from user objects before sending them out
userSchema.methods.sanitize =  function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

//method to check is user has pending('stillShopping') transaction
userSchema.methods.getCart = function () {
  var user = this;
// sballan Remove merge conflict remnants
<<<<<<< HEAD
  return Transaction.findOne({customerId: user._id, status: 'stillShopping'})
=======
  return mongoose.model('Transction').findOne({customer: user._id, status: 'stillShopping'})
>>>>>>> 4533740ce1c7ed3f0ea63f6c3480320ac9e7d51f
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