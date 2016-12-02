var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema for the polls
var pollSchema = new Schema({
  title: String,
  hash: String,
  answers: [{answer: String, votes: Number}]
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
