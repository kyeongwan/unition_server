/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	

	login: function(req, res){
		return res.login({
    		phoneNumber: req.param('phoneNumber'),
    		gcmReg: req.param('gcmReg'),
    		successRedirect: '/',
    		invalidRedirect: '/login'
		});
	},

	find: function(req, res){
		
	}
};

