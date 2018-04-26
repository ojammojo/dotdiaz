//centers the synthBlock according to the dimensions of the client window;
function centerSynth() {
  var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;
      //document.getElementById('synthBlock').style.left = x*.1+"px";
      //document.getElementById('synthBlock').style.top = y/4+"px";
  //alert(x + ' × ' + y);
}

var mouseX = 0, mouseY = 0;
var lagX, lagY;
var synthPosX = 0;

//document.onmousemove = function (e) {getMousePos(e);};

function getMousePos(e) {
  mouseX = event.clientX + document.body.scrollLeft;
  mouseY = event.clientY + document.body.scrollTop;
}

//var moveSynth = setInterval(moveSynth, 10);
//var setMousePosition = setInterval(getMouse, 1000);

function getMouse() {
  //console.log(synthPosX + " <--- updated synthPosX");
  lagX = mouseX;
  lagY = mouseY;
  var element = document.getElementById("synthBlock");
  //document.getElementById("synthBlock").style.left = synthPosX + "px";
  //var rect = element.getBoundingClientRect();
  //synthPosX = parseInt(rect.left);
  //console.log(synthPosX);
  //console.log(synthPosX);
  //console.log(document.getElementById("synthBlock").style.top);
}

function moveSynth() {
  var diff = mouseX - synthPosX;
  if (diff < 0){
    synthPosX = synthPosX - 7;
  } else {
    if (diff == 0) {

    } else {
      synthPosX = synthPosX + 7;
    }
  }
  //lagX++;
  //lagY++;
  //synthPosX = synthPosX + 50;
  //console.log(synthPosX);
  document.getElementById("mousePositions").innerHTML = lagX + " " + synthPosX + " " + (lagX - synthPosX);
  //document.getElementById("synthBlock").style.top =  lagY/10+ "px";
  document.getElementById("synthBlock").style.left = synthPosX/10 + "px";
}

function showMousePos() {
  document.getElementById("mousePositions").innerHTML = mouseX + " " + mouseY;
}

document.onmousemove = function (e) {backgroundColour(e);}
//adjusts the background colour depending on the mouse location
function backgroundColour(e) {
  mouseX = event.clientX + document.body.scrollLeft;
  mouseY = event.clientY + document.body.scrollTop;
  //document.getElementById('vidContainer').style.backgroundColor = "rgba(" + mouseX + ", 0, 0, 0)";
}

var count = 1;

function gone() {
  count = count - 0.1;
  document.getElementById("splashScreen").style.opacity = count;
  if (count < 0) {
    document.getElementById("splashScreen").style.display = "none";
  }
}

function showSynth() {
  setTimeout(function() {
    document.getElementById("splashScreen").style.opacity = 0;
  }, 2000);
}
