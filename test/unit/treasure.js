/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure  = require('../../app/models/treasure'),
    //Mongo     = require('mongodb'),
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
      var t = new Treasure({'name':['gold'], 'loc':['Mexico', '90', '-90.35'], 'diff':['1'], 'order':['2'], 'photos':['img1', 'img2'], 'hints':['do this', 'then that', 'then this again'], 'tags':['tag1, tag2']});
      expect(t).to.be.instanceof(Treasure);
      expect(t.name).to.equal('gold');
      expect(t.loc.name).to.equal('Mexico');
      expect(t.loc.lat).to.equal(90);
      expect(t.loc.lng).to.equal(-90.35);
      //add further tests
    });
  });

  describe('.create', function(){
    it('should create and save a new Treasure object', function(){
      //var o = {'name':['gold'], 'loc':['Mexico', '90', '-90.35'], 'diff':['1'], 'order':['2'], 'photos':['img1', 'img2'], 'hints':['do this', 'then that', 'then this again'], 'tags':['tag1, tag2']};
      //Treasure.create(o, {photos:[]}, function(){
        //Treasure.findById(o._id, function(err, t){
          //expect(t).to.be.instanceof(Treasure);
          //expect(t._id).to.be.instanceof(Mongo.ObjectID);
        //});
      //});
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
