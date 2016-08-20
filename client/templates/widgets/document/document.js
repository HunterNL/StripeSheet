Template.document.onCreated(function(){
  
});

Template.document.onRendered(function(){

});

Template.document.events({
  "click [data-action=document_remove]" :function (e,tmp) {
    Meteor.call('doc_remove',this.document._id);
  }
});

Template.document.helpers({
  classesFor(document,fields) {
  
    var classes = [];
    
    fields.forEach(function(field) {
      if(field.addClass) {
        classes.push(document[field.dbField]);
      }
    });
    
    if(window.location.hash === "#"+document._id) {
      classes.push("highlighted");
    }

    
    return classes.join(" ");
  }
});

