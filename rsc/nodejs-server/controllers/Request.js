'use strict';

var utils = require('../utils/writer.js');
var Request = require('../service/RequestService');

module.exports.requestAllGET = function requestAllGET (req, res, next) {
  var token = req.swagger.params['token'].value;
  var goodId = req.swagger.params['goodId'].value;
  Request.requestAllGET(token,goodId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.requestIdPUT = function requestIdPUT (req, res, next) {
  var token = req.swagger.params['token'].value;
  var id = req.swagger.params['id'].value;
  var message = req.swagger.params['message'].value;
  Request.requestIdPUT(token,id,message)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
