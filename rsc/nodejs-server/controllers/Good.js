'use strict';

var utils = require('../utils/writer.js');
var Good = require('../service/GoodService');

module.exports.goodAddPOST = function goodAddPOST (req, res, next) {
  var token = req.swagger.params['token'].value;
  var name = req.swagger.params['name'].value;
  var expiry = req.swagger.params['expiry'].value.toISOString().substring(0, 10);
  var available = req.swagger.params['available'].value;
  var image = req.swagger.params['image'].value;
  var locationLatitude = req.swagger.params['location.latitude'].value;
  var locationLongitude = req.swagger.params['location.longitude'].value;
  Good.goodAddPOST(token,name,expiry,available,image,locationLatitude,locationLongitude)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.goodAllGET = function goodAllGET (req, res, next) {
  var token = req.swagger.params['token'].value;
  Good.goodAllGET(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.goodIdGET = function goodIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  var token = req.swagger.params['token'].value;
  Good.goodIdGET(id,token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.goodImageIdGET = function goodImageIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  var size = req.swagger.params['size'].value;
  Good.goodImageIdGET(id,size)
    .then(function (response) {
      res.writeHead(200, {'Content-Type': 'image/jpg'});
      res.end(response, 'binary');
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.goodNearbyGET = function goodNearbyGET (req, res, next) {
  var locationLatitude = req.swagger.params['location.latitude'].value;
  var locationLongitude = req.swagger.params['location.longitude'].value;
  var token = req.swagger.params['token'].value;
  var radius = req.swagger.params['radius'].value;
  Good.goodNearbyGET(locationLatitude,locationLongitude,token,radius)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.goodNeedPOST = function goodNeedPOST (req, res, next) {
  var token = req.swagger.params['token'].value;
  var payload = req.swagger.params['payload'].value;
  Good.goodNeedPOST(token,payload)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
