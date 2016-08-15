Template.document_field.onCreated(function(){

});

Template.document_field.onRendered(function(){

});

Template.document_field.events({

});

Template.document_field.helpers({
  value() {
    return this.document[this.field.dbField];
  }
});


