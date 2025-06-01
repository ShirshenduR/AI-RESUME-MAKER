const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/#/login', session: true }),
  (req, res) => {
    console.log('✅ Google callback:', req.user);
    console.log('✅ Session after login:', req.session);

    req.session.save(() => {
      res.redirect(`${process.env.CLIENT_URL}/#/dashboard`);
    });
  }
);

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).json({ message: 'Error during logout' });
        }
        res.redirect(process.env.CLIENT_URL + '/#/login');
    });
});

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

app.get('/test-set-cookie', (req, res) => {
  req.session.test = 'hello';
  res.send('Session set');
});

app.get('/test-get-cookie', (req, res) => {
  res.send(`Session says: ${req.session.test}`);
});

module.exports = router;