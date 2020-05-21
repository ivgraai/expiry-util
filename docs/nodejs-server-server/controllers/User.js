'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.userDELETE = function userDELETE (req, res, next) {
  var token = req.swagger.params['token'].value;
  User.userDELETE(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userGET = function userGET (req, res, next) {
  var name = req.swagger.params['name'].value;
  var password = req.swagger.params['password'].value;
  User.userGET(name,password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userPOST = function userPOST (req, res, next) {
  var payload = req.swagger.params['payload'].value;
  User.userPOST(payload)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
