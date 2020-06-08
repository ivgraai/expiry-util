'use strict';


/**
 * Find all by good
 * 
 *
 * token String 
 * goodId Long  (optional)
 * returns RequestAllResponse
 **/
exports.requestAllGET = function(token,goodId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Approve a request
 * 
 *
 * token String 
 * id Long 
 * message RequestChangeRequest 
 * no response value expected for this operation
 **/
exports.requestIdPUT = function(token,id,message) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

