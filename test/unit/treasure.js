/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure  = require('../../app/models/treasure'),
    Mongo     = require('mongodb'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'treasure-map-test';

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var t = new Treasure({'name':'gold', 'loc':{'name':'Mexico', 'lat':'90', 'lng':'-90'}, 'diff':'1', 'order':'2', 'photos':{}, 'hints':{'1':'do this', '2':'then that', '3':'then this again'}, 'tags':'tag1, tag2'});
      expect(t).to.be.instanceof(Treasure);
    });
  });

  describe('.create', function(){
    it('should create and save a new Treasure object', function(){
    });
  });

  describe('.query', function(){
    it('should get all treasures', function(done){
      Treasure.query({}, {}, function(err, treasures){
        expect(treasures).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should get one treasure', function(done){
      var id = '000000000000000000000002';
      Treasure.findById(id, function(err, treasure){
        expect(treasure.name).to.equal('fame');
        done();
      });
    });
  });

  describe('.found', function(){
    it('should get change treasure to found', function(done){
      var id = '000000000000000000000002';
      Treasure.found(id, function(){
        Treasure.findById(id, function(err, treasure){
          expect(treasure.isFound).to.be.true;
          done();
        });
      });
    });
  });
});

