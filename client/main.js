
Template.registerHelper("fields",function() {
  return Meteor.settings.public.fields;
});

Template.registerHelper("isAdmin",function () {
  return Meteor.user().isAdmin;
});





