'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: "584975833793-93n95u5p4fpetdo9lts874gp65qqka6c.apps.googleusercontent.com",
        clientSecret: "aEbr5ybBhEK0tecfKtAskVjh",
        callbackURL: "http://127.0.0.1:1337/auth/google/callback"
    };

    var verifyCallback = function (token, refreshToken, profile, done) {
        UserModel.findOne({ 'google.id': profile.id }).exec()
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return UserModel.create({
                        email: profile._json.email,
                        picture: profile._json.picture,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        google: {
                            id: profile.id,
                            email: profile._json.email,
                            token: token
                        }
                    });
                }

            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));


    app.get('/auth/google/callback', passport.authenticate('google', { 
        failureRedirect: '/login',
        successRedirect: '/meals'
    }));
}