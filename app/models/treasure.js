'use strict';

var Mongo = require('mongodb'),
    fs    = require('fs'),
    path  = require('path');

function Treasure(o){
  this.name     = o.name[0];
  this.loc      = {};
  this.loc.name = o.loc[0];
  this.loc.lat  = parseFloat(o.loc[1]);
  this.loc.lng  = parseFloat(o.loc[1]);
  this.diff     = o.diff[0] * 1;
  this.order    = o.order[0] * 1;
  this.hints    = o.hints;
  this.photos   = [];
  this.tags     = o.tags[0].split(',').map(function(t){return t.trim();});
  this.isActive = (o.order[0] === '1') ? true : false;
  this.isFound  = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.create = function(fields, files, cb){
  var t = new Treasure(fields);
  Treasure.collection.save(t, function(){
    t.uploadPhoto(files, cb);
  });
};

Treasure.query = function(query, cb){
  var filter = {},
      sort   = {};

  if(query.tag){filter = {tags:{$in:[query.tag]}};}
  if(query.sort){sort[query.sort] = query.order * 1;}

  Treasure.collection.find(filter).sort(sort).toArray(cb);
};

Treasure.found = function(o, cb){
  var order = (o.order * 1) + 1,
      _id = Mongo.ObjectID(o.id);
  Treasure.collection.update({_id:_id}, {$set:{isFound:true}}, function(){
    Treasure.collection.update({order:order}, {$set:{isActive:true}}, cb);
  });
};

Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id}, cb);
};

//private helper functions

Treasure.prototype.uploadPhoto = function(files, cb){
  var dir    = __dirname + '/../static/img/' + this._id,
      exist  = fs.existsSync(dir),
      self   = this;

  if(!exist){
    fs.mkdirSync(dir);
  }

  files.photos.forEach(function(photo){
    var ext    = path.extname(photo.path),
        rel    = '/img/' + self._id + '/' + self.photos.length + ext,
        abs    = dir + '/' + self.photos.length + ext;
    fs.renameSync(photo.path, abs);

    self.photos.push(rel);
  });

  Treasure.collection.save(self, cb);

};

module.exports = Treasure;
