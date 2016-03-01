'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var userSchema = mongoose.model('User').schema;

var buyerSchema = userSchema.extend({
  //will have a cart schema for persisting a logged in user's cart?
  cart: {type: Schema.Types.ObjectId, ref: 'Cart'}
});

mongoose.model('Buyer', buyerSchema);