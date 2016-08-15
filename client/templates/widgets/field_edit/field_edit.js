var field_map = {
  string : "text",
  number : "tel",
  date : "date"
}


Template.field_edit.onCreated(function(){

});

Template.field_edit.onRendered(function(){

});

Template.field_edit.events({

});

Template.field_edit.helpers({
  getInputType(field) {
    return field_map[field.type];
  },
  
  getValue() {
    return this.document[this.field.dbField];
  },
  
  isDropdown(field) {
    return field.type === "choice";
  },
  
  maybeSelected(option) {
    console.log(Template.currentData());
    
    if(option == this.document[this.field.dbField]) {
      return {selected:"selected"};
    }
  }
});
