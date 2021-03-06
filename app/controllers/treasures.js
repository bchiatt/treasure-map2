'use strict';

var Treasure = require('../models/treasure'),
    mp       = require('multiparty'),
    makeLink = require('../helpers/make-link');

exports.index = function(req, res){
  Treasure.query(req.query, function(err, treasures){
    res.render('treasures/index', {treasures:treasures, query:req.query,  makeLink:makeLink});
  });
};

exports.init = function(req, res){
  Treasure.collection.count(function(err, count){
    var order = ++count;
    res.render('treasures/init', {order:order});
  });
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    Treasure.create(fields, files, function(){
      res.redirect('/treasures');
    });
  });
};

exports.show = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    res.render('treasures/show', {treasure:treasure});
  });
};

exports.done = function(req, res){
  Treasure.found(req.params, function(){
    res.redirect('/treasures');
  });
};
