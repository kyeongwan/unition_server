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
    		userName: req.param('userName'),
    		nToken: req.param('nToken'),
    		successRedirect: '/',
    		invalidRedirect: '/login'
		});
	},

	find: function(req, res){
		return res.find({
			phoneNumber: req.param('phoneNumber'),
			successRedirect: '/',
			invalidRedirect: '/find'
		});
	},

	sendMessage: function(req, res){
		return res.sendMessage({
			phoneNumber: req.param('phoneNumber'),
			message: req.param('message'),
			lot: req.param('lot'),
			lat: req.param('lat'),
			to: req.param('to'),
			from: req.param('from'),
			successRedirect: '/',
			invalidRedirect: '/sendMessage'
		});
	}
};

