/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	user_id:{
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
    	user.save();
    });
  },

  attemptLogin: function (inputs, cb) {
    // Create a user
    User.findOne({
      phoneNumber: inputs.phoneNumber,
      gcmReg: inputs.gcmReg
    })
    .exec(cb);
  },

  find: function(inputs, cb){
  	User.findOne({
  		phoneNumber: inputs.phoneNumber
  	}).exec(cb);
  },

  sendMessage: function(inputs, cd){
  	User.findOne({
  		phoneNumber: inputs.phoneNumber
  	}).then(function(user){
  		var gcmReg = user.gcmReg;
  		//var gcm = require('node-gcm');
		//var message = new gcm.Message();

		// var message = new gcm.Message({
	 //    	collapseKey: 'demo',
	 //    	delayWhileIdle: true,
	 //    	timeToLive: 3,
	 //    	data: {
	 //        	key1: '안녕하세요.',
  //       		key2: 'saltfactory push demo'
  //   		}
		// });

		// var server_access_key = '푸시 프로바이더 서버 access key 값';
		// var sender = new gcm.Sender(server_access_key);
		// var registrationIds = [];

		// var registration_id = '안드로이드 registration_id 값';
		// // At least one required
		// registrationIds.push(registration_id);

		/**
		 * Params: message-literal, registrationIds-array, No. of retries, callback-function
		 **/
		sender.send(message, registrationIds, 4, function (err, result) {
		    console.log(result);
		});
  	});
  }

};

