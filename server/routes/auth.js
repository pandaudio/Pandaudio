const router = require('express').Router();
const passport = require('passport');

const authController = require('../controllers/authController.js');


router.get(
  '/spotify',
  passport.authenticate('github', {
    scope: ['user:email'],
  })
);