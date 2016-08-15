Template.invite_manager.onCreated(function () {
  this.subscribe("invites_all");
});

Template.invite_manager.onRendered(function(){

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

Template.invite_manager.helpers({
  invites : function () {
    return Invites.find();
  }
});

