'use strict';

const fs = require('fs');

/**
 * Share a new good
 * 
 *
 * token String 
 * name String 
 * expiry date 
 * available Boolean 
 * image File  (optional)
 * location.latitude Float  (optional)
 * location.longitude Float  (optional)
 * no response value expected for this operation
 **/
exports.goodAddPOST = function(token,name,expiry,available,image,locationLatitude,locationLongitude) {
  return new Promise(function(resolve, reject) {
    fs.writeFileSync(name + "," + expiry + "," + image.originalname, image.buffer, "binary");
    /* var examples = {};
    examples['attribute'] = "value";
    if (Object.keys(examples).length > 0) {
      resolve(examples);
    } else { */
      resolve();
    // }
  });
}


/**
 * Fetch my goods
 * 
 *
 * token String 
 * returns GoodAllResponse
 **/
exports.goodAllGET = function(token) {
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
 * Check status of the good
 * 
 *
 * id Long 
 * token String  (optional)
 * returns GoodResponse
 **/
exports.goodIdGET = function(id,token) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "imageId" : 0,
  "address" : {
    "country" : "country",
    "city" : "city",
    "street" : "street",
    "postalCode" : "postalCode",
    "name" : "name",
    "region" : "region"
  },
  "replyMessage" : "replyMessage",
  "isAccepted" : true,
  "name" : "name",
  "expiry" : "2000-01-23",
  "myMessage" : "myMessage",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find image by identifier
 * 
 *
 * id Long 
 * size String 
 * no response value expected for this operation
 **/
exports.goodImageIdGET = function(id,size) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Fetch available goods
 * 
 *
 * location.latitude Float 
 * location.longitude Float 
 * token String  (optional)
 * radius Integer  (optional)
 * returns GoodNearbyResponse
 **/
exports.goodNearbyGET = function(locationLatitude,locationLongitude,token,radius) {
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
 * Request the good
 * 
 *
 * token String 
 * payload GoodNeedRequest 
 * no response value expected for this operation
 **/
exports.goodNeedPOST = function(token,payload) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

