const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('users');
passport.serializeUser((user, done)=> {
  done(null, user.id);
});

passport.deserializeUser(async (id, done)=> {
  const user = await User.findById(id);
  return done(null, user);
});


module.exports = passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });

    if(existingUser) {
      return done(null, existingUser);
    }

    const newUser = await new User({ googleId: profile.id });
    return done(null, newUser);
  })
);