/**
 * res.login([inputs])
 *
 * @param {String} inputs.username
 * @param {String} inputs.password
 *
 * @description :: Log the requesting user in using a passport strategy
 * @help        :: See http://links.sailsjs.org/docs/responses
 */

module.exports = function login(inputs) {
  inputs = inputs || {};

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Look up the user
  User.attemptLogin({
    phoneNumber: inputs.phoneNumber,
    gcmReg: inputs.gcmReg,
    userName: inputs.userName,
    nToken: inputs.nToken
  }, function (err, user) {
    if (err) return res.negotiate(err);
    if (!user) {

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the user agent know the login was successful.
      // (also do this if no `invalidRedirect` was provided)
      if (req.wantsJSON || !inputs.invalidRedirect) {

        return res.ok('Fail');
      }
      // Otherwise if this is an HTML-wanting browser, redirect to /login.
      return res.redirect(inputs.invalidRedirect);
    }

    // "Remember" the user in the session
    // Subsequent requests from this user agent will have `req.session.me` set.
    req.session.me = user.id;

    User.change({
          phoneNumber: inputs.phoneNumber,
          gcmReg: inputs.gcmReg,
          userName: inputs.userName,
          nToken: inputs.nToken
        });

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a 200 response letting the user agent know the login was successful.
    // (also do this if no `successRedirect` was provided)
    if (req.wantsJSON || !inputs.successRedirect) {
      return res.ok('Success');
    }

    // Otherwise if this is an HTML-wanting browser, redirect to /.
    return res.redirect(inputs.successRedirect);
  });

};


