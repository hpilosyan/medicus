'use strict';

var db = require('../config/db');
var promise = require('node-promise');
var _ = require('underscore');

module.exports = {
  add_history_item: function(item) {
    var deferred = promise.defer();

    var history_item = {};
    var amount_per_day = item.time.timestamps.length;
    var days_interval = item.time.days_interval;
    console.log(item.amount, amount_per_day, Math.ceil(item.amount / amount_per_day));
    var overal_days = Math.ceil(item.amount / amount_per_day) * days_interval;
    history_item.pill_name = item.pill_name;
    history_item.amount_per_day = amount_per_day;
    history_item.days_interval = days_interval;
    history_item.overal_days = overal_days;

    db.collection('history').insert(history_item, function (err, items) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(items);
      }
    });

    return deferred.promise;
  },

  get_history: function () {
    var deferred = promise.defer();

    db.collection('history').find().toArray(function (err, items) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(items);
      }
    });

    return deferred.promise;
  }
};