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

function nodeOrParenthasEditingTag(element) {
  while(element) {
    if(element.dataset.tag==="editing") {
      return true;
    }
    
    element=element.parentElement;
  }

  return false;
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

function submitUpdate(docId,dbField,value) {
  var updateObj = {};
  updateObj[dbField]=value;
  Meteor.call("doc_update",docId,updateObj);
}

Template.document_field.onCreated(function(){
  this.editing = new ReactiveVar(false);
  
  this.onClick = function(e) {
    if(!eventOriginatedFromTemplate(e,this)) {      
      var data = this.data;
      var value = this.find("[data-field]").value;
      submitUpdate(data.document._id,data.field.dbField,value);
      this.editing.set(false);
    }
  }.bind(this);
  
  var tmp = this;
  this.autorun(function () {
    //TODO optimize me #performance
    if(tmp.editing.get()) {
      window.addEventListener("click",tmp.onClick);
    } else {
      window.removeEventListener("click",tmp.onClick);
    }
    
  })
});

Template.document_field.onRendered(function(){

});

Template.document_field.events({
  "click [data-action=edit]" :function (e,tmp) {
    if(e.target.dataset.action==="abort") return; //Prevent instant re-rediting
    if(nodeOrParenthasEditingTag(e.target)) return;
    
    tmp.editing.set(true);
  },
  
  "click [data-action=abort]" :function (e,tmp) {
    tmp.editing.set(false);
  },
  
  "submit, change select" : function (e,tmp) {
    if(e.type === "submit") {
      e.preventDefault();
    }
    
    console.log(e);
    
    var field = this.field.dbField;
    var value = tmp.find("[data-field]").value;
    console.log(this);
    
    submitUpdate(this.document._id,field,value);
    
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
  },
  
  editingTag() {
    if(Template.instance().editing.get()) {
      var q={};
      q["data-tag"]="editing";
      return q;
    }
  },
  
  editingClass(){
    if(Template.instance().editing.get()) {
      return "editing";
    }
  }
});

Template.onDestroyed(function () {
  window.removeEventListener("click",this.onClick);
});
