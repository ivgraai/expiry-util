'use strict';

var uuid = require('uuid');

/**
 * Unregister user
 * 
 *
 * token String 
 * no response value expected for this operation
 **/
exports.userDELETE = function(token) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Login user
 * 
 *
 * name String 
 * password String 
 * returns UUID
 **/
exports.userGET = function(name,password) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = uuid.v4();
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Register user
 * 
 *
 * payload UserSignUpRequest 
 * no response value expected for this operation
 **/
exports.userPOST = function(payload) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

