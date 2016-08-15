Template.spreadsheet.helpers({
  documents() {
    return Documents.find();
  }
});

Template.document_field.helpers({
  value() {
    console.log(this);
    return this.document[this.field.dbField];
  }
});

Template.spreadsheet.onCreated(function() {
  this.subscribe("data_all");
});

Template.registerHelper("fields",function() {
  return Meteor.settings.public.fields;
});

Template.registerHelper("isAdmin",function () {
  return Meteor.user().isAdmin;
});

Template.registerHelper("debug_log",function (obj) {
  console.log(obj);
})

Template.input_for_field.helpers({
  getInputType(field) {
    return "text";
  }
});

Template.create_account.events({
  "submit" : function (e,tmp) {
    e.preventDefault();
    
    var email = tmp.find("[data-field=email]").value;
    var password = tmp.find("[data-field=password]").value;
    var token = tmp.find("[data-field=token]").value;
    
    Meteor.call("account_create_token",email,password,token,function () {
      Meteor.loginWithPassword({email},password);
    }) ;
  }
});

Template.invite_manager.onCreated(function () {
  this.subscribe("invites_all");
});

Template.invite_manager.helpers({
  invites : function () {
    return Invites.find();
  }
});

Template.invite_manager.events({
  "click [data-action=invite_create]" :function (e,tmp) {
    console.log(e);
    Meteor.call("invite_create");
  },
  
  "click [data-action=invite_remove]" : function (e,tmp) {
    Meteor.call("invite_remove",this._id);
  }
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