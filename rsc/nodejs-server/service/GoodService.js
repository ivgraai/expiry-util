'use strict';

const fs = require('fs');
const moment = require('moment');
const pattern = "YYYY-MM-DDTHH:mm:ss.SSSZ";

/**
 * Share a new good
 * 
 *
 * token String 
 * name String 
 * expiry Date 
 * available Boolean 
 * image File  (optional)
 * location.latitude Float  (optional)
 * location.longitude Float  (optional)
 * no response value expected for this operation
 **/
exports.goodAddPOST = function(token,name,expiry,available,image,locationLatitude,locationLongitude) {
  return new Promise(function(resolve, reject) {
    fs.writeFileSync(name + "," + expiry + "," + image.originalname, image.buffer, "binary");
      resolve();
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
      expiry: moment().add(1, 'days').format(pattern),
      isRequestedByOther: false,
      id: 1000
    });
    entities.push({
      name: 'milk',
      expiry: moment().add(1, 'days').format(pattern),
      isRequestedByOther: false,
      id: 1001
    });
    entities.push({
      name: 'butter',
      expiry: moment().add(2, 'days').format(pattern),
      isRequestedByOther: true,
      id: 1002
    });
    entities.push({
      name: 'apples',
      expiry: moment().add(3, 'days').format(pattern),
      isRequestedByOther: true,
      id: 1003
    });
    entities.push({
      name: 'honey',
      expiry: moment().add(5, 'days').format(pattern),
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
    var entity = (2000 == id) ? {
  "address" : {
    "country" : "France",
    "city" : "Paris",
    "street" : "126 Rue de l'Université",
    "postalCode" : "75007",
    "name" : "Bourbon Palace",
    "region" : "Île-de-France"
  },
  "replyMessage" : "I am waiting you between 5-7pm, thanks!",
  "isAccepted" : true,
  "name" : "tomatoes",
  "expiry" : moment().add(2, 'days').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format(pattern),
  "myMessage" : "I can offer some peppers in return!",
  "username" : "Aimée Voubrahms"
} : {
  "address" : {
    "country" : "Spain",
    "city" : "Madrid",
    "street" : "Plaza de las Cortes",
    "postalCode" : "28014",
    "name" : "Congress of Deputies",
    "region" : "Madrid"
  },
  "replyMessage" : "n/a",
  "isAccepted" : false,
  "name" : "ice cream",
  "expiry" : moment().add(29, 'days').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format(pattern),
  "myMessage" : "I appreciate it in advance.",
  "username" : "Alen Gualarga"
};
    resolve(entity);
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
    var image;
    switch (id) {
      case 1000:  image = fs.readFileSync('./cliparts/bread.jpg'); break;
      case 1001:  image = fs.readFileSync('./cliparts/milk.jpg'); break;
      case 1002:  image = fs.readFileSync('./cliparts/butter.jpg'); break;
      case 1003:  image = fs.readFileSync('./cliparts/apples.jpg'); break;
      case 1004:  image = fs.readFileSync('./cliparts/honey.jpg'); break;
      case 2000:  image = fs.readFileSync('./cliparts/tomatoes.jpg'); break;
      case 2001:  image = fs.readFileSync('./cliparts/minced_meat.jpg'); break;
      case 2002:  image = fs.readFileSync('./cliparts/orange_juice.jpg'); break;
      case 2003:  image = fs.readFileSync('./cliparts/chocolate.jpeg'); break;
      case 2004:  image = fs.readFileSync('./cliparts/bananas.jpg'); break;
      case 2005:  image = fs.readFileSync('./cliparts/sausage.jpg'); break;
      case 2006:  image = fs.readFileSync('./cliparts/biscuits.jpg'); break;
      case 2007:  image = fs.readFileSync('./cliparts/wine.jpg'); break;
      case 2008:  image = fs.readFileSync('./cliparts/washing_powder.jpeg'); break;
      case 2009:  image = fs.readFileSync('./cliparts/ice_cream.jpg'); break;
      default:    image = null;
    }
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
      name: 'tomatoes',
      expiry: moment().add(2, 'days').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format(pattern),
      distance: 1543,
      id: 2000,
      isRequestedByMe: true
    });
    entities.push({
      name: 'minced meat',
      expiry: moment().add(3, 'days').format(pattern),
      distance: 952,
      id: 2001,
      isRequestedByMe: false
    });
    entities.push({
      name: 'orange juice',
      expiry: moment().add(5, 'days').format(pattern),
      distance: 1812,
      id: 2002,
      isRequestedByMe: false
    });
    entities.push({
      name: 'chocolate',
      expiry: moment().add(7, 'days').format(pattern),
      distance: 687,
      id: 2003,
      isRequestedByMe: false
    });
    entities.push({
      name: 'bananas',
      expiry: moment().add(11, 'days').format(pattern),
      distance: 406,
      id: 2004,
      isRequestedByMe: false
    });
    entities.push({
      name: 'sausage',
      expiry: moment().add(13, 'days').format(pattern),
      distance: 2052,
      id: 2005,
      isRequestedByMe: false
    });
    entities.push({
      name: 'biscuits',
      expiry: moment().add(17, 'days').format(pattern),
      distance: 570,
      id: 2006,
      isRequestedByMe: false
    });
    entities.push({
      name: 'wine',
      expiry: moment().add(19, 'days').format(pattern),
      distance: 3288,
      id: 2007,
      isRequestedByMe: false
    });
    entities.push({
      name: 'washing powder',
      expiry: moment().add(23, 'days').format(pattern),
      distance: 3700,
      id: 2008,
      isRequestedByMe: false
    });
    entities.push({
      name: 'ice cream',
      expiry: moment().add(29, 'days').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format(pattern),
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

