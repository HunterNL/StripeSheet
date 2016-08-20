# Stripesheet :tiger2:

Stripsheet is a tool to quickly get a simple frontend to show and edit a mongodb collection by simply writing a config file.

Useful for creating super simple, config-driven, apps or prototyping larger ones.

Build with Meteor.js

## Documentation
Todo

### Settings file

The options for the settings file are :
  
name | type | description
--- | --- | ---
`title` | String | Page title
`dbCollectionName` | String | Name of mongodb collection to show
`cssFiles` | String* | Paths to custom CSS to include,
`tokenExpireHours` | number | Hours until invite keys expire
`fields` | [Object] | See below


  
  
The fields settings should contain an array containing field objects, which can have the following keys

name | type | description
--- | --- | ---
`name` | String | User friendly name for field
`type` | String | Type of field, can be `string`,`number`,`date` or `choice`
`default` | varies | Default value for this field
`dbField` | String | What field to read from the database,
`addClass` | Boolean | Whether or not to add this field's value to the row's css classes,
`parseMarkdown` | Boolean | Whether or no this field should be run trough markdown before being displayed

`[type]` denotes an array of these types  
\* can also be an array containing this type
  
  