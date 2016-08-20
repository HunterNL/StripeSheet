Template.create_account.onCreated(function(){
  this.isMakingAdminUser = new ReactiveVar(false);
  
  var tmp = this;
  
  Meteor.call("has_no_users",function (err,res) {
    if(err) throw err;
    
    if(res) {
      tmp.isMakingAdminUser.set(true);
    }
  });
});

Template.create_account.onRendered(function(){

});

Template.create_account.events({
  "submit" : function (e,tmp) {
    e.preventDefault();
    
    var isMakingAdminUser = tmp.isMakingAdminUser.get();
    
    var email = tmp.find("[data-field=email]").value;
    var password = tmp.find("[data-field=password]").value;    
    
    var token;
    if(!isMakingAdminUser) {
      token = tmp.find("[data-field=token]").value;
    }    

    Meteor.call("account_create_token",email,password,token,function () {
      Meteor.loginWithPassword({email},password);
    }) ;
  }
});

Template.create_account.helpers({
  isMakingAdminUser() {
    return Template.instance().isMakingAdminUser.get();
  }
});

