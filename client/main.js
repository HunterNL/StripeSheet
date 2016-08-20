
Template.registerHelper("fields",function() {
  return Meteor.settings.public.fields;
});

Template.registerHelper("isAdmin",function () {
  return Meteor.user().isAdmin;
});

Template.registerHelper("headerTitle",function () {
  return Meteor.settings.public.title;
});

Template.registerHelper("headerCSS",function () {
  var fileNames = Meteor.settings.public.css_files;
  
  if(!fileNames) return;
  
  var files = [].concat(fileNames);
  
  return files;
});


