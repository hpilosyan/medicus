var express = require('express');
var apn = require('apn');
var user = require('../models/user');

var router = express.Router();

router.get('/:box', function(req, res) {
  var box = req.param.box;
  user.get_user().then(function (user, box) {
    var token = user.mobile_token;
  });
});

function send_notification (token, box) {
  var myDevice = new apn.Device(token);

  var note = new apn.Notification();
  note.badge = 1;
  note.sound = "notification-beep.wav";
  note.alert = { "body" : "Refill box " + box, "action-loc-key" : "Play" , "launch-image" : "mysplash.png"};
  note.payload = {'messageFrom': 'Medicus'};

  note.device = myDevice;

  var callback = function (errorNum, notification) {
      console.log('Error is: %s', errorNum);
      console.log("Note ", notification);
  };
  var options = {
      gateway: 'gateway.sandbox.push.apple.com', // this URL is different for Apple's Production Servers and changes when you go to production
      errorCallback: callback,
      cert: 'MedicusCert.pem',
      key:  'MedicusPrivateCert.pem',
      passphrase: 'med1234',
      port: 2195,
      enhanced: true,
      cacheLength: 100
  };
  var apnsConnection = new apn.Connection(options);
  apnsConnection.sendNotification(note);
}

module.exports = router;
