// stores bool with info wether we have received the general poll data
var hasPoll = false;
var hash = "";
// wait for document to finish loading before creating socket
$( document ).ready(function() {
  var socket = io('http://localhost');

  var count = 0;
  hash = window.location.href.match(/\/([^/]*)$/)[1];
  console.log(hash);
  socket.emit('loadPage', { hash: hash });
  socket.on('sendPoll', function(data)
  {
    // if we already have a poll, discard new update
    if (!hasPoll)
    {
      hasPoll = true;
      $('.title').html(data.title);
      $('.hash').html(data.hash);
      data.answers.forEach(function(entry)
      {
        var c = document.createElement('input');
        var p = document.createElement('p');
        var votes = document.createElement('p');
        votes.id = 'vote'+count;
        c.type = 'radio';
        c.name = 'group';
        c.id = count;
        $(p).text(entry.answer);
        $(votes).text(entry.votes);
        var newP = document.getElementById('answers').appendChild(p);
        $(newP).append(c);
        $(newP).append(votes);
        count++;
      })

      // put the "begin update listener" into on(sendPoll) so we only start listening once we actually got a poll
      socket.on('beginUpdate', function(data){
        var count = 0;
        data.answers.forEach(function(entry){
        $('#vote'+count).text(entry.votes);
          count++;
        });
      });
    }
  });
});

  function vote(){
    var radios = document.getElementsByName( 'group' );
      for( i = 0; i < radios.length; i++ ) {
        if( radios[i].checked ) {
          socket.emit('vote', {id: radios[i].id, hash: hash});
        }
    }
    return null;
  }
