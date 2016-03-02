'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var userSchema = mongoose.model('User').schema;

var buyerSchema = userSchema.extend({
  cart: {type: Schema.Types.ObjectId, ref: 'Transaction'}
});

mongoose.model('Buyer', buyerSchema);