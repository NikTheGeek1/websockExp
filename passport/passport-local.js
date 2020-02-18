'use strict';

const passport = require('passport'); // requiring passport module
const User = require('../models/user'); // fetching the userSchema in the user model
const LocalStrategy = require('passport-local').Strategy;

// determines which of the user data will be saved in the session. usually the user id
passport.serializeUser((user, done) => { // arrow function
    done(null, user.id);
});
// the following uses the user id to locate the given user data from the database
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {

        const newUser = new User();

        newUser.username = req.body.username;
        newUser.fullname = req.body.username;
        newUser.email = req.body.username;
        newUser.password = req.body.password;

        newUser.save((err) => {
            done(null, newUser);
        });
}));
