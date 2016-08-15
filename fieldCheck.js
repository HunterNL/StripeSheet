var fields = Meteor.settings.public.fields;

function includes(arr,val) {
  return arr.some(function (element) {
    return element == val;
  });
}

if(!fields) {
  throw new Meteor.Error("no_fields","No fields detected, please make sure your settings contains public.fields with an array of possible fields");
}

var VALID_TYPES = ["string","number","data","choice"];
var RESERVED_FIELDS = ["_date_created","_date_updated","_last_editor","_history"];

function checkFieldValidity(field) {  
  if(!field.name) {
    throw new Meteor.Error("field_no_name","field has no name!");
  }
  
  var name = field.name;
  
  if(!field.dbField) {
    throw new Meteor.Error("field_no_dbfield","Field \""+name+"\" no dbField value");
  }
  
  if(includes(RESERVED_FIELDS,field.dbField)) {
    throw new Meteor.Error("dbField_reserved","dbField \""+field.dbField+"\" is reserved");
  }
  
  if(!includes(VALID_TYPES,field.type)) {
    throw new Meteor.Error("field_invalid_type","field \""+name+"\" has an invalid type","Type is \""+field.type+"\" but allowed types are "+VALID_TYPES.join(","));
  }
  
  if(field.type === "choice")  {
    if(!Array.isArray(field.choices)) {
      throw new Meteor.Error("field_invalid_choices","field \""+name+"\" has type set to choice, but choice is not an array");
    }
  }
  
}

fields.forEach(checkFieldValidity);

