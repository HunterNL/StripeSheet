function isFirstUser() {
  return Meteor.users.find().count() === 0;
}

Meteor.methods({
  "account_create_token": function (email,password,token) {
    check([email,password],[String]);
    
    var makeAdminUser = isFirstUser();
    
    //TODO refactor this makeAdminUser stuff
    
    if(!makeAdminUser) {
      check(token,String);
      if(!Invites.find({token:token})) {
        throw new Meteor.Error("invalid or expired token");
      }
    }
    
    
    //TODO check for expired tokens
    
    var id = Accounts.createUser({
      email:email,
      password:password
    });
    
    console.log(id);
    
    if(makeAdminUser) {
      Meteor.users.update({_id:id},{
        $set : {
          isAdmin : true
        }
      });
    }
    
    if(!makeAdminUser) {
      Invites.remove({token}); //Use up token
    }
    
    return true;
  }

});
