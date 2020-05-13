'use strict';

var utils = require('../utils/writer.js');
var Good = require('../service/GoodService');

module.exports.goodPOST = function goodPOST (req, res, next) {
  var name = req.swagger.params['name'].value;
  var expiry = req.swagger.params['expiry'].value;
  var image = req.swagger.params['image'].value;
  Good.goodPOST(name,expiry,image)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
