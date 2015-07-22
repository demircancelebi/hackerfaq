'use strict';

var _ = require('lodash');
var Question = require('./question.model');
var PythonShell = require('python-shell');

// Get list of questions
exports.index = function(req, res) {
  Question.find(function (err, questions) {
    if(err) { return handleError(res, err); }
    return res.json(200, questions);
  });
};

// Get a single question
exports.show = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    return res.json(question);
  });
};

// Creates a new question in the DB.
exports.create = function(req, res) {
  Question.create(req.body, function(err, question) {
    var options = {
      // mode: 'text',
      // pythonPath: '/usr/bin/python',
      // pythonOptions: ['-u'],
      scriptPath: './',
      args: [req.body.question]
    };

    PythonShell.run('how.py', options, function (err, results) {
      if (err) {
        handleError(res, err);
      }
      // results is an array consisting of messages collected during execution
      if(err) { return handleError(res, err); }
      var resString = '';

      results.forEach(function (item) {
        resString += item + '\n';
      });
      console.log(results);
      return res.json(201, resString);
    });

  });
};

// Updates an existing question in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Question.findById(req.params.id, function (err, question) {
    if (err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    var updated = _.merge(question, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, question);
    });
  });
};

// Deletes a question from the DB.
exports.destroy = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    question.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}