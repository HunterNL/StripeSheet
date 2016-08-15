Template.spreadsheet.onCreated(function() {
  this.subscribe("data_all");
});

Template.spreadsheet.onRendered(function(){

});

Template.spreadsheet.events({

});

Template.spreadsheet.helpers({
  documents() {
    return Documents.find();
  }
});

