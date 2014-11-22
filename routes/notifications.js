var express = require('express');
var router = express.Router();

router.get('/ios', function(req, res) {
  var apn = require('apn');

  var myPhone = "7998e8a2b1b5de548d906d15a885159f5a01ef611f12040d6d167c73f3bc25f7";

  var myDevice = new apn.Device(myPhone);

  var note = new apn.Notification();
  note.badge = 1;
  note.sound = "notification-beep.wav";
  note.alert = { "body" : "Hakob!", "action-loc-key" : "Play" , "launch-image" : "mysplash.png"};
  note.payload = {'messageFrom': 'Holly'};

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
});


router.get('/android', function(req, res) {
  var gcm = require('node-gcm');
/*
  // create a message with default values
  var message = new gcm.Message();

  // or with object values
  var message = new gcm.Message({
      collapseKey: 'demo',
      delayWhileIdle: true,
      timeToLive: 3,
      data: {
          key1: 'message1',
          key2: 'message2'
      }
  });

  var API_KEY = 'AIzaSyABewzzzExO5DiJ7ZoRoVrRW9x49ls-G8E';
  var sender = new gcm.Sender(API_KEY);
  var registrationIds = [];

  message.collapseKey = 'demo';
  message.delayWhileIdle = true;
  message.timeToLive = 3;
  message.dryRun = true;
  // END OPTIONAL

  // At least one required
  registrationIds.push('APA91bEDgwm2-EMP8XR-PG3FilXMqVEvMNfQppv43L2tr0mtRMNe2jnYHsKAYxRUORIb2mZCp3fJeywFzZWrM9c1UJJCAwheXp6c_stvkO_NJfSn_VEkJ7ujJpz5jas3KQpp4ThLxy4U-NAoW4XS-Boi03iMFTWnFw');

  sender.send(message, registrationIds, 4, function (err, result) {
      console.log(result);
  });
  */

  var API_KEY = 'AIzaSyABewzzzExO5DiJ7ZoRoVrRW9x49ls-G8E';
  var sender = new gcm.Sender(API_KEY);
  var message = new gcm.Message();
  message.addData('key1','testdarinodegcm');
  message.delay_while_idle = 1;
  var registrationIds = [];
  registrationIds.push('APA91bEDgwm2-EMP8XR-PG3FilXMqVEvMNfQppv43L2tr0mtRMNe2jnYHsKAYxRUORIb2mZCp3fJeywFzZWrM9c1UJJCAwheXp6c_stvkO_NJfSn_VEkJ7ujJpz5jas3KQpp4ThLxy4U-NAoW4XS-Boi03iMFTWnFw');
  sender.send(message, registrationIds, 4, function (err, result) {
    console.log(result);
  });
  res.json({nlah: "blah"});
});



module.exports = router;
