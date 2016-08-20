var field_map = {
  string : "text",
  number : "tel",
  date : "date"
}

Template.input_for_field.onCreated(function(){

});

Template.input_for_field.onRendered(function(){

});

Template.input_for_field.events({
  
});

Template.input_for_field.helpers({
  isDropDown(field)  {
    return field.type === "choice";
  },
  
  getInputType(field) {
    return field_map[field.type];
  }
});


