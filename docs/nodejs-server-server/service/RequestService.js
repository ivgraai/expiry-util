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
    var entities = [];
    entities.push({
      username: "applicant_1",
      datetime: "2020-06-08T09:15:30.000Z",
      message: "Please!?",
      id: 3000
    });
    entities.push({
      username: "applicant_2",
      datetime: "2020-06-08T09:30:15.000Z",
      message: "I love sweets...",
      id: 3001
    });
    resolve(entities);
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

