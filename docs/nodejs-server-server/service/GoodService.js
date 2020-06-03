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
    var entities = [];
    entities.push({
      name: 'bread',
      expiry: '2020-06-07',
      isRequestedByOther: false,
      id: 1000
    });
    entities.push({
      name: 'milk',
      expiry: '2020-06-10',
      isRequestedByOther: false,
      id: 1001
    });
    entities.push({
      name: 'butter',
      expiry: '2020-07-01',
      isRequestedByOther: true,
      id: 1002
    });
    entities.push({
      name: 'apple',
      expiry: '2020-07-31',
      isRequestedByOther: true,
      id: 1003
    });
    entities.push({
      name: 'honey',
      expiry: '2021-01-01',
      isRequestedByOther: false,
      id: 1004
    });
    resolve(entities);
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
    var image = fs.readFileSync('/tmp/dummy.jpg');
    resolve(image);
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
    var entities = [];
    entities.push({
      name: 'tomato',
      expiry: '2020-06-04',
      distance: 1543,
      id: 2000,
      isRequestedByMe: true
    });
    entities.push({
      name: 'minced meat',
      expiry: '2020-06-27',
      distance: 952,
      id: 2001,
      isRequestedByMe: false
    });
    entities.push({
      name: 'orange juice',
      expiry: '2020-07-14',
      distance: 1812,
      id: 2002,
      isRequestedByMe: false
    });
    entities.push({
      name: 'chocolate',
      expiry: '2020-08-31',
      distance: 687,
      id: 2003,
      isRequestedByMe: true
    });
    entities.push({
      name: 'banana',
      expiry: '2020-09-08',
      distance: 406,
      id: 2004,
      isRequestedByMe: false
    });
    entities.push({
      name: 'sausage',
      expiry: '2020-09-28',
      distance: 2052,
      id: 2005,
      isRequestedByMe: false
    });
    entities.push({
      name: 'biscuits',
      expiry: '2020-10-02',
      distance: 570,
      id: 2006,
      isRequestedByMe: false
    });
    entities.push({
      name: 'wine',
      expiry: '2020-10-19',
      distance: 3288,
      id: 2007,
      isRequestedByMe: false
    });
    entities.push({
      name: 'washing powder',
      expiry: '2020-11-02',
      distance: 3700,
      id: 2008,
      isRequestedByMe: false
    });
    entities.push({
      name: 'ice cream',
      expiry: '2020-12-12',
      distance: 2281,
      id: 2009,
      isRequestedByMe: true
    });
    resolve(entities);
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

