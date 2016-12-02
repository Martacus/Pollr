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
