Meteor.publish("data_all",function () {
  if(!this.userId) { //User not logged i
    this.ready();
    return; 
  }
  
  return Documents.find();
});

Meteor.publish("invites_all",function () {
  var userId = this.userId;
  
  if(!userId) {
    this.ready();
    return;
  }
  
  var user = Meteor.users.findOne({_id:userId});
  
  if(user && user.isAdmin) {
    return Invites.find();
  }
  
  this.ready();
});


//Publish custom user data like isAdmin
Meteor.publish(null, function(){
  if(!this.userId) return;
  
  return Meteor.users.find({_id:this.userId},{
    fields : {
      isAdmin : 1
    }
  });
});



