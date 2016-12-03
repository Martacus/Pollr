var number = 2;

function newInput(){
  number++;
  var i = document.createElement('input');
  i.type = "text";
  i.name = "answer";
  i.className = "form-control";
  var l = document.createElement('label');
  var d = document.getElementById("labels");
  d.appendChild(i);
}

$( document ).ready(function() {
    var socket = io('http://localhost');

    socket.emit("retrieveHomePolls");

    socket.on("receiveHomePolls", function(data){
        data.poll.forEach(function(entry)
        {
          console.log("S");
          var div = document.createElement("div");

          var p = document.createElement("p");

          var a = document.createElement("a");
          a.textContent = entry.title;
          a.href = "/" + entry.hash;

          p.className = "title";
          $(p).append(a);

          div.id = "post";
          $(div).append(p);

          var newP = document.getElementById('maindiv');
          $(newP).append(div);
        })
    });
});