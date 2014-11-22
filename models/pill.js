'use strict';

var db = require('../config/db');
var promise = require('node-promise');
var _ = require('underscore');

module.exports = {
  add_pill: function (device_token, name) {
    var deferred = promise.defer();

    db.collection('device').update({token: device_token}, {'$addToSet': {pills: name}}, function (err, device) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(device);
      }
    });

    return deferred.promise;
  },

  all_pills: function () {
    var deferred = promise.defer();

    db.collection('pill').find().toArray(function (err, pills) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(pills);
      }
    });

    return deferred.promise;
  },

  add_to_pill_collection: function (name) {
    var deferred = promise.defer();

    db.collection('pill').save({name: name}, function (err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result);
      }
    });

    return deferred.promise;
  }
};