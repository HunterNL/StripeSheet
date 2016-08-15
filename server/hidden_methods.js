function isFirstUser() {
  return Meteor.users.find().count() === 0;
}

function isExpired(invite) {
  var expire_hours = Meteor.settings.public.token_expire_hours
  var expire_point = new Date(invite.date_created.getTime()+1000*60*60*expire_hours);
  
  return (new Date() > expire_point);
}

Meteor.methods({
  "account_create_token": function (email,password,token) {
    check([email,password],[String]);
    
    var makeAdminUser = isFirstUser();
    
    //TODO refactor this makeAdminUser stuff
    
    if(!makeAdminUser) {
      check(token,String);
      
      var invite = Invites.findOne({token:token}) ;
      if(!invite) {
        throw new Meteor.Error("token_invalid");
      }
      
      if(isExpired(invite)) {
        Invites.remove(invite._id);
        throw new Meteor.Error("token_expired");
      }
    }
    
    
    var id = Accounts.createUser({
      email:email,
      password:password
    });
    
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
