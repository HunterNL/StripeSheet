function requireUser() {
  if(!Meteor.user()) {
    throw new Meteor.Error("unauthorized");
  }
}

function requireAdmin() {
  var user = Meteor.user();
  
  if(!user) {
    throw new Meteor.Error("unauthorized");
  }
  
  if(!user.isAdmin) {
    throw new Meteor.Error("unauthorized");
  }
}

Meteor.methods({
  "doc_create": function (fields) {
    requireUser();
    
    return Documents.insert(fields);
  },
  
  doc_update : function (id,fields) {
    requireUser();
    check(fields,Object);
    check(id,String);
    
    return Documents.update({_id:id},{
      $set : fields
    });
  },
  
  doc_remove : function (id) {
    requireAdmin();
    check(id,String);
    
    Documents.remove({_id:id});
  },
  
  invite_create() {
    requireAdmin();
    
    Invites.insert({
      token: Random.secret(),
      date_created : new Date()
    });
  },
  
  invite_remove(id) {
    requireAdmin();
    
    check(id,String);
    Invites.remove({_id:id});
  }
});