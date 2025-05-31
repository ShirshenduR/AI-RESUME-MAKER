const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    scope: ['profile', 'email']
}, (accessToken, refreshToken, profile, callback) => {
    const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value
    };
    return callback(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user);  
});

passport.deserializeUser((user, done) => {
    done(null, user); 
});

module.exports = passport;