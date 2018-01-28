const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('users');
passport.serializeUser((user, done)=> {
  done(null, user.id);
});

passport.deserializeUser((id, done)=> {
  User.findById(id)
    .then(user => done(null, user));
});


module.exports = passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then((existringUser) => {
        if(existringUser) {
          console.log('user already exists')
          done(null, existringUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then((newUser) => done(null, newUser));
        }

      })
      .catch((e) => {
        console.log('error', e);
      })


  })
);