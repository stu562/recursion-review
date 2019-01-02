// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  var targetElements = [];
  var getChildrenElementsByClassName = function(root, className) {
    var targetElements = [];
    for (var i = 0; i < root.children.length; i++) {
      var element = root.children[i];
      if (element.className.includes(className)) {
        targetElements.push(element);  
      }
      targetElements = targetElements.concat(getChildrenElementsByClassName(element, className));
    }
    return targetElements;
  };
  if (document.body.className.includes(className)) { 
    targetElements.push(document.body);  
  }
  return targetElements.concat(getChildrenElementsByClassName(document.body, className));
};
