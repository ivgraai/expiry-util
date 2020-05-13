'use strict';


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
    var examples = {};
    examples['attribute'] = "value";
    if (Object.keys(examples).length > 0) {
      resolve(examples);
    } else {
      resolve();
    }
  });
}

