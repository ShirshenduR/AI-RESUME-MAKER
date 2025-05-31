const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`
}, (accessToken, refreshToken, profile, done) => {
    const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value
    };
    done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);  // save only user ID to session
});

passport.deserializeUser((id, done) => {
    // Here you should ideally fetch user by ID from DB
    // For now, just recreate user object or fetch from some cache
    // If no DB, store user info in-memory or in session instead

    // Example dummy user for testing:
    const user = { id: id }; // minimal user object, update as needed
    done(null, user);
});

module.exports = passport;
