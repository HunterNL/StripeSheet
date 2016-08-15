var collectionName = Meteor.settings.public.dbCollectionName;
if(!collectionName) {
  throw new Meteor.Error("no_collectionname","No dbCollectionName specified, make sure your settings contains public.dbCollectionName");
}

Documents = new Mongo.Collection(collectionName);
Invites = new Mongo.Collection("invites");