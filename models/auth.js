var db = require('../config/db');
var promise = require('node-promise');

var model = module.exports;

// In-memory datastores:
var oauthClients = [{
        clientId : 'hayk',
        clientSecret : 'my_secret',
        redirectUri : ''
    }],
    authorizedClientIds = {
        password: [
            'hayk'
        ],
        refresh_token: [
            'hayk'
        ]
    };

function get_access_tokens () {
  var deferred = promise.defer();

  db.collection('access_token').find().toArray(function (err, items) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(items);
    }
  });

  return deferred.promise;
}

function add_access_token (token) {
  var deferred = promise.defer();

  db.collection('access_token').insert(token, function (err, items) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(items);
    }
  });

  return deferred.promise;
}

function get_refresh_tokens () {
  var deferred = promise.defer();

  db.collection('refresh_token').find().toArray(function (err, items) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(items);
    }
  });

  return deferred.promise;
}

function add_refresh_token (token) {
  var deferred = promise.defer();

  db.collection('access_token').insert(token, function (err, items) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(items);
    }
  });

  return deferred.promise;
}

function get_user (username, password) {
  var deferred = promise.defer();

  db.collection('user').findOne({username: username, password: password}, function (err, user) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(user);
    }
  });

  return deferred.promise;
}

model.getAccessToken = function (bearerToken, callback) {
  get_access_tokens().then(function (oauthAccessTokens) {
    for(var i = 0, len = oauthAccessTokens.length; i < len; i++) {
      var elem = oauthAccessTokens[i];
      if(elem.accessToken === bearerToken) {
        return callback(false, elem);
      }
    }
    callback(false, false);
  });
};

model.getRefreshToken = function (bearerToken, callback) {
  get_refresh_tokens().then(function (oauthRefreshTokens) {
    for(var i = 0, len = oauthRefreshTokens.length; i < len; i++) {
      var elem = oauthRefreshTokens[i];
      if(elem.refreshToken === bearerToken) {
        return callback(false, elem);
      }
    }
    callback(false, false);
  });
};

model.getClient = function (clientId, clientSecret, callback) {
  for(var i = 0, len = oauthClients.length; i < len; i++) {
    var elem = oauthClients[i];
    if(elem.clientId === clientId &&
      (clientSecret === null || elem.clientSecret === clientSecret)) {
      return callback(false, elem);
    }
  }
  callback(false, false);
};

model.grantTypeAllowed = function (clientId, grantType, callback) {
  callback(false, authorizedClientIds[grantType] &&
    authorizedClientIds[grantType].indexOf(clientId.toLowerCase()) >= 0);
};

model.saveAccessToken = function (accessToken, clientId, expires, userId, callback) {
  add_access_token({
    accessToken: accessToken,
    clientId: clientId,
    userId: userId,
    expires: expires
  }).then(function () {
    callback(false);
  });
};

model.saveRefreshToken = function (refreshToken, clientId, expires, userId, callback) {
  add_refresh_token({
    refreshToken: refreshToken,
    clientId: clientId,
    userId: userId,
    expires: expires
  }).then(function () {
    callback(false);
  });
};

/*
 * Required to support password grant type
 */
model.getUser = function (username, password, callback) {
  get_user(username, password).then(function (user) {
    callback(false, user);
  }, function (e) {
    callback(false, false);
  });
};