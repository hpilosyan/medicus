var mongo = require('mongoskin');
var config = require('./config');

var db = mongo.db('mongodb://' + config.db.host + ':' + config.db.port + config.db.database, {native_parser: false});

module.exports = db;