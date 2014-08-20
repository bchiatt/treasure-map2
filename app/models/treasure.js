'use strict';

var Mongo = require('mongodb');

function Treasure(o){
  this.name = o.name;
  this.loc = o.loc;
  this.diff = o.diff * 1;
  this.order = o.order * 1;
  this.hints = makeArray(o.hints);
  this.photos = [];
  this.tags = o.tags.split(',').map(function(t){return t.trim();});
  this.isFound = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.create = function(){};

Treasure.query = function(query, sort, cb){
  Treasure.collection.find(query, sort).toArray(cb);
};

Treasure.found = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.update({_id:_id}, {$set:{isFound:true}}, cb);
};

Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id}, cb);
};

//private helper functions

function makeArray(o){
  var keys = Object.keys(o),
      array = [];

  for(var i = 1; i <= keys.length; i++){
    array.push(o[i]);
  }

  return array;
}

module.exports = Treasure;
