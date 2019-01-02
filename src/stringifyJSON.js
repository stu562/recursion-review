// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (obj === null) {
    return "null";
  } else if (obj === true) {
    return "true";
  } else if (obj === false) {
    return "false";
  } else if (Array.isArray(obj)) {
    var result = "[";
    for (var element of obj) {
      result += stringifyJSON(element);
      result += ",";
    }
    if(result.length !== 1){
      result = result.slice(0, result.length - 1);
    }
    result += "]";
    return result;
  } else if (typeof obj === "string") {
    return '"' + obj + '"';
  } else if (typeof obj === "number") {
    return obj + '';
  } else {
    var result = '{';
    for (let prop in obj) {
      if (obj[prop] === undefined || typeof obj[prop] === "function") {
        continue;  
      }
      result += '"' + prop + '"';
      result += ':';
      
      result += stringifyJSON(obj[prop]);
      result += ',';
    }
    if(result.length !== 1){
      result = result.slice(0, result.length - 1);
    }
    result += "}";
    return result;
  }
};
