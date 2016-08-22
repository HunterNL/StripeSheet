Template.new_document.onCreated(function(){

});

Template.new_document.onRendered(function(){

});

Template.new_document.events({
  "submit" :function (e,tmp) {
    e.preventDefault();
    
    function fieldsToObj(prev,cur) {
      prev[cur.dataset.field]=cur.value;
      return prev;
    }
    
    var elements = tmp.findAll("[data-field]");
    var fields = elements.reduce(fieldsToObj,{});
    
    Meteor.call("doc_create",fields);
  }
});

Template.new_document.helpers({
  formId() {
    return "new_document_form";
  }
});

