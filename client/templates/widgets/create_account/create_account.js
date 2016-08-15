Template.create_account.onCreated(function(){

});

Template.create_account.onRendered(function(){

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

Template.create_account.helpers({

});

