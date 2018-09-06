const router = require('express').Router();

// routes
router.get('/get_session', function(req, res) {
  res.json({ user_id: req.session.user_id });
});

module.exports = router;
