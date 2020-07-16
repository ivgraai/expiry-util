'use strict';

const moment = require('moment');

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
      username: "Peter Smith",
      datetime: moment().subtract(5, 'hours').add(45, 'seconds').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      message: "Please approve my request!?",
      id: 3000
    });
    entities.push({
      username: "James Jones",
      datetime: moment().subtract(1, 'days').add(15, 'minutes').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      message: "I love my belly... :-)",
      id: 3001
    });
    resolve({
      accepted:(1002 == goodId) ? 3001 : null,
      datas: entities
    });
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

