const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const usersController = require('../controllers/users_controller');

router.get('/profile', auth.isAuthenticated, usersController.profile);

router.get('/sign-up',auth.sessionCheck, usersController.signUp);
router.get('/sign-in',auth.sessionCheck, usersController.signIn);


router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);


router.get('/sign-out', usersController.destroySession);

module.exports = router;