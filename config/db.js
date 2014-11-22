var mongo = require('mongoskin');
var config = require('./config');

var credentials = config.db.username && config.db.password ? config.db.username + config.db.password + '@' : '';
var db = mongo.db('mongodb://' + credentials + config.db.host + ':' + config.db.port + config.db.database, {native_parser: false});

module.exports = db;