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
      if(field.addsClass) {
        classes.push(document[field.dbField]);
      }
    });
    
    return classes.join(" ");
  }
});

