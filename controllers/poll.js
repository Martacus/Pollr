var Poll = require('../modules/poll.js');

//Function for creating new polls
module.exports.newPoll = function(req, res, next){
  var number = 0;
  var randomHash = makeid();
  var answerstring = '[]';
  var answerobject = JSON.parse(answerstring);

  req.body.answer.forEach(function(entry){
    answerobject[number] = {answer: entry , votes: 0}
    number++;
  })

  var createdPoll = new Poll({title: req.body.polltitle, hash: randomHash,
    answers: answerobject});

  Poll.create(createdPoll, function (err, poll) {
    if (err) {
      console.log(err);
      return handleError(err);
    }
    console.log("Saved new poll");
  });
  res.redirect('/' + randomHash);
}

//The function for finding the socket and then sending the poll to the pollpage.js to setup the page
module.exports.findPollSocket = function(socket, data){
  Poll.findOne({'hash' : data}, function(err, poll){
    if (err) return handleError(err);
    socket.emit('sendPoll', poll);
  });
}

//Updates the poll info that is send to pollpage.js. It gets the vote it needs to increment, does that. Then sends an update to the pollpage.js to update the view
module.exports.updatePoll = function(socket, data){
  var answerKey = 'answers.' + data.id + '.votes';
  var updatePoll = {$inc: {}};
  updatePoll.$inc[answerKey] = 1;

  Poll.update({hash: data.hash}, updatePoll, function(err, poll){
    if (err) return console.log(err);
  });

  Poll.findOne({'hash' : data.hash}, function(err, poll){
    if (err) return handleError(err);

    /* the poll has been updated by this socket but nobody (except the socket who pressed vote)
       has been informed of theupdate yet this means we can now send a update to every
       socket thats also in the room of that socket. (since room = poll) */
    if (data.hash)
    {
      // to make a socket broadcast to other sockets in that same room, but not himself, we can use socket.broadcast.to(roomId)
      socket.broadcast.to(data.hash).emit('beginUpdate', poll);
    }

  });


}

//Makes an hash
function makeid()
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
