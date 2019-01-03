// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // [{"x":[10,null,null,null]},3,"false",false]

  if (json === "null") {
    return null;
  } else if (json === "true") {
    return true;
  } else if (json === "false") {
    return false;
  } else if(json[0] === '"'){
    return json.slice(1, json.length - 1);
  } else if(json[0] === '[') {
    var result = [];
    var currentIndex = 1;
    while(currentIndex < json.length - 1) {
      var nextElement = findNextElement(json, currentIndex);
      result.push(parseJSON(nextElement));
      currentIndex += nextElement.length;
    }
    return result;
  } else if(json[0] === '{') {
    var result = {};
    var currentIndex = 1;
    while(currentIndex < json.length - 1) {
      var nextElement = findNextElement(json, currentIndex);
      result.push(parseJSON(nextElement));
      currentIndex += nextElement.length;
    }
    return result;
  } else {
    //return parseFloat(json);
  }
};
var findNextElement = function(json, start) {
  var openBrackets = 0;
  var i = start;
  while(true){
    var char = json[i];
    if (char === '{' || char === '[') {
      openBrackets++;  
    } else if (char === '}' || char === ']') {
      openBrackets--;  
    } else if (openBrackets === 0 && (char === ',' || char === ']' || char === '}')) {
      break;
    }
    i++;
  }
  return json.slice(start, i);
}

var parseString = function(json, start) {
  var prevBackslash = false;
  var prevDoubleBackslash = false;
  var i = start + 1;
  var escapeChars = ["/", "b", "f", "n", "r", "t"];
  while(true){
    var char = json[i];
    if (char === "\\" && !prevBackslash) {
      prevBackslash = true;
    } else if (char === "\\" && prevBackslash) {
      prevDoubleBackslash = true; 
    } else if (prevBackslash && escapeChars.includes(char)) {
      throw new SyntaxError();
    } else if (prevDoubleBackslash && !escapeChars.includes(char)) {
      throw new SyntaxError();
    } else if (char === '"' && !prevDoubleBackslash) {
      return json.slice(start + 1, i);
    }
    i++;
  }
}