'use strict';

var db = require('../config/db');
var promise = require('node-promise');
var _ = require('underscore');

module.exports = {
  get_all: function() {
    var deferred = promise.defer();

    db.collection('user').find().toArray(function (err, items) {
      console.log(items);
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(items);
      }
    });

    return deferred.promise;
  }
};
