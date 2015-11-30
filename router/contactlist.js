'use strict';

var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();

var db = mongojs('contactlist', ['contactlist']);

router.get('/', function(req, res) {
  db.contactlist.find({}, function(err, data) {
    console.log(data);
    res.json(data);
  });
});

router.post('/', function(req, res) {
  db.contactlist.insert(req.body, function(err, data) {  
    res.json(data);
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, data) {
    res.json(data);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, data) {
    res.json(data);
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},
    new: true}, function(err, data) {
      res.json(data);
    });
  });

module.exports = router;