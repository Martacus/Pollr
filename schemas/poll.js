var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
  title: String,
  hash: String
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll
