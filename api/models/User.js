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
  }

};

