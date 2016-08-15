Template.document.onCreated(function(){

});

Template.document.onRendered(function(){

});

Template.document.events({

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

