const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        req.session.passport.user = req.user;
        res.redirect(process.env.CLIENT_URL+ '/dashboard');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL+ '/login');
});

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

module.exports = router;