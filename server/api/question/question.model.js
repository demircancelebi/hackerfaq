'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question: String
});

module.exports = mongoose.model('Question', QuestionSchema);