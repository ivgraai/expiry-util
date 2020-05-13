'use strict';

const fs = require('fs');

/**
 * Add a new good to the list
 * 
 *
 * name String 
 * expiry date 
 * image File  (optional)
 * returns String
 **/
exports.goodPOST = function(name,expiry,image) {
  return new Promise(function(resolve, reject) {
    fs.writeFileSync(name + "," + expiry + "," + image.originalname, image.buffer, "binary");
    var examples = {};
    examples['attribute'] = "value";
    if (Object.keys(examples).length > 0) {
      resolve(examples);
    } else {
      resolve();
    }
  });
}

