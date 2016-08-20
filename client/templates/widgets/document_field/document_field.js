var KEY_ESCAPE = 27;

function includes(arr,val) {
  return arr.some(function(element) {
    return val === element;
  });
}

function isInTemplate(node,template) {
  var view = Blaze.getView(node);
  
  if(!view || typeof view.templateInstance !== "function") return false;
  
  var templateInstance = view.templateInstance();
  
  return (templateInstance === template);
}

function eventOriginatedFromTemplate(e,template) {
  var currentNode = e.target;
  
  while(currentNode) {
    if(isInTemplate(currentNode,template)) {
      return true;
    }
    
    currentNode = currentNode.parentElement;
  }
  
  return false;
}

Template.document_field.onCreated(function(){
  this.editing = new ReactiveVar(false);
  
  this.onClick = function(e) {
    if(!eventOriginatedFromTemplate(e,this)) {
      this.editing.set(false);
    }
  }.bind(this);
});

Template.document_field.onRendered(function(){
  //TODO optimize me #performance
  window.addEventListener("click",this.onClick);
});

Template.document_field.events({
  "click [data-action=edit]" :function (e,tmp) {
    if(e.target.dataset.action==="abort") return; //Prevent instant re-rediting
    
    
    tmp.editing.set(true);
  },
  
  "click [data-action=abort]" :function (e,tmp) {
    tmp.editing.set(false);
  },
  
  "submit" : function (e,tmp) {
    e.preventDefault();
    var field = this.field.dbField;
    var value = tmp.find("[data-field]").value;
    
    var updateObj = {};
    updateObj[field]=value;
    
    
    Meteor.call("doc_update",this.document._id,updateObj);
    tmp.editing.set(false);
  },
  
  "keydown input" : function (e,tmp) {
    if(e.which !== KEY_ESCAPE) return;
    tmp.editing.set(false);
  }
  
});

Template.document_field.helpers({
  value() {
    return this.document[this.field.dbField];
  },
  
  editing() {
    return Template.instance().editing.get();
  },
  
  markdownClass(bool) {
    if(bool) {
      return "markdown";
    }
  }
});

Template.onDestroyed(function () {
  window.removeEventListener("click",this.onClick);
});
