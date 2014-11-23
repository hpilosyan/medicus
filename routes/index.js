var express = require('express');
var notifications = require('./notifications');
var users = require('./users');
var schedule = require('./schedule');
var pills = require('./pills');
var history = require('./history');
var oauthserver = require('oauth2-server');
var auth_model = require('../models/auth');

var router = express.Router();

module.exports = function (app) {
  app.oauth = oauthserver({
    model: auth_model,
    grants: ['password', 'refresh_token'], // supported grant types
    debug: true
  });

  // This route is called for authentication (getting access token)
  router.all('/oauth/token', app.oauth.grant());

  router.use('/user', users);
  router.use('/schedule', schedule);
  router.use('/pill', pills);
  router.use('/history', history);
  router.use('/notify', notifications);

  router.use(app.oauth.errorHandler());

  return router;
};
