'use strict';

exports.index = function(req, res){
  res.render('treasures/index');
};

exports.init = function(req, res){
  res.render('treasures/init');
};

exports.create = function(req, res){
  res.redirect('/vacations');
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

