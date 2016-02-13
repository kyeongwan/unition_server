/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	userName:{
		type: 'string',
		required: true
	},
	phoneNumber: {
		type: 'string',
		required: true
	},
	nToken: {
		type: 'string',
		required: true
	},
	gcmReg: {
		type: 'string',
		required: true
	}
  },

  change: function (inputs, cb) {
    // Create a user
    User.findOne({
      phoneNumber: inputs.phoneNumber
    }).then(function(user){
    	user.gcmReg = inputs.gcmReg;
    	user.nToken = inputs.nToken;
    	user.userName = inputs.userName;
    	user.save();
    });
  },

  attemptLogin: function (inputs, cb) {
    // Create a user
    User.findOne({
      phoneNumber: inputs.phoneNumber,
    })
    .exec(cb);
  },


  signup: function (inputs, cb) {
    // Create a user
    User.create({
      userName: inputs.userName,
      phoneNumber: inputs.phoneNumber,
      // TODO: But encrypt the password first
      gcmReg: inputs.gcmReg,
      nToken: inputs.nToken
    }).exec(cb);
  },

  find: function(inputs, cb){
  	User.findOne({
  		phoneNumber: inputs.phoneNumber
  	}).exec(cb);
  },

  findName: function(inputs, cb){
  	User.findOne({
  		phoneNumber: inputs.phoneNumber
  	}).then(function(user){
  		return user.userName;
  	})
  },

  sendMessage: function(inputs, cd){
  	User.findOne({
  		phoneNumber: inputs.phoneNumber
  	}).then(function(user){
  		var gcmReg = user.gcmReg;
  		console.log(gcmReg);
  		var gcm = require('node-gcm');
		var message = new gcm.Message();

		var message = new gcm.Message({
	    	collapseKey: 'demo',
	    	delayWhileIdle: true,
	    	timeToLive: 3,
	    	data: {
	        	title: inputs.to + '님이 고이접어를 남겼습니다.',
        		message: inputs.lot + '/' + inputs.lat + '/' + inputs.message,
        		from: inputs.fromg
    		}
		});

		var server_access_key = 'AIzaSyCB0oQZg9lBBf5IhLhUphsV8RnXLwe1iac';
		var sender = new gcm.Sender(server_access_key);
		var registrationIds = [];

		var registration_id = gcmReg;
		// At least one required
		registrationIds.push(registration_id);

		/**
		 * Params: message-literal, registrationIds-array, No. of retries, callback-function
		 **/
		sender.send(message, registrationIds, 4, function (err, result) {
		    console.log(result);
		});
  	});
  }

};

