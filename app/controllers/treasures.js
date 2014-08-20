'use strict';

var Treasure = require('../models/treasure'),
    moment   = require('moment'),
    mp       = require('multiparty');

exports.index = function(req, res){
  res.render('treasures/index', {moment:moment});
};

exports.init = function(req, res){
  res.render('treasures/init');
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
  res.render('treasures/show');
};

exports.done = function(req, res){
  res.redirect('/treasures');
};

exports.index = function(req, res){
  res.render('treasures/index');
};

