function getCSSFileNameArray() {
  var files = Meteor.settings.public.cssFiles;
  
  if(typeof files === "undefined") return;
  
  return [].concat(files);
}

function addCustomHeader() {
  addCSS();
  setTitle();
}

function setTitle(head) {
  var title = Meteor.settings.public.title;
  if(typeof title === "string") {
    document.title = title;
  }
}

function addCSS(head) {
  var cssFiles = getCSSFileNameArray();
  
  if(typeof cssFiles === "undefined") return; //If nothing, abort
  
  console.log(cssFiles);
  
  var documentFragment = document.createDocumentFragment();
  var file,link;
  
  for (var i = 0; i < cssFiles.length; i++) {
    file = cssFiles[i];
    link = document.createElement("link");
    
    link.href = file;
    link.rel="stylesheet";
    
    documentFragment.appendChild(link);
  }
  
  document.head.appendChild(documentFragment);
}

document.addEventListener("DOMContentLoaded",addCustomHeader);