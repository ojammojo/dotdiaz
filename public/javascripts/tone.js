var audioCtx = new (window.AudioContext || window.webkitAudioContext);

//volume nodes
var sineGain = audioCtx.createGain();
var sqrGain = audioCtx.createGain();
var sToothGain = audioCtx.createGain();

//creating osc objects
var sine = audioCtx.createOscillator();
var sqr = audioCtx.createOscillator();
var sTooth = audioCtx.createOscillator();

//delay nodes
var delay = audioCtx.createDelay(5);
delay.delayTime.value = 0.5;

//setting the base frequency of osc objects
sine.frequency.setValueAtTime(0, audioCtx.currentTime);
sqr.frequency.setValueAtTime(0, audioCtx.currentTime);
sTooth.frequency.setValueAtTime(0, audioCtx.currentTime);

//assigning osc types to above objects
sine.type = 'sine';
sqr.type = 'square';
sTooth.type = 'sawtooth';

//connecting osc to 'volume' gain node
sine.connect(sineGain);
sqr.connect(sqrGain);
sTooth.connect(sToothGain);

sineGain.gain.value = 0;
sqrGain.gain.value = 0;
sToothGain.gain.value = 0;
//var sliderDiv = document.getElementById("sliderAmount");
//var slide = document.getElementById("slide");

// function hexCalc(val) {
//   var number = '#' + val + 'ff00';
//   return number;
// }

// var testNoise = audioCtx.createOscillator();
// testNoise.frequency = 150;
//
// var testGain = audioCtx.createGain();
//
// testNoise.connect(testGain);
// testGain.connect(audioCtx.destination);

var now = audioCtx.currentTime;

//testing a decaying sine sound
// testGain.gain.setValueAtTime(1, now);
// testGain.gain.exponentialRampToValueAtTime(0.001, now + 1);
// testNoise.start(now);
// testNoise.stop(now + 1);

//console.log(audioCtx.currentTime);


var bassPads = [0,0,0,0];

var kick = new Kick(audioCtx);
var now = audioCtx.currentTime;

function Kick(audioCtx) {
  this.audioCtx = audioCtx;
};

Kick.prototype.setup = function () {
  this.osc = this.audioCtx.createOscillator();
  this.gain = this.audioCtx.createGain();
  this.osc.connect(this.gain);
  this.gain.connect(this.audioCtx.destination);
}

Kick.prototype.trigger = function(time) {
	this.setup();

	this.osc.frequency.setValueAtTime(100, time);
	this.gain.gain.setValueAtTime(1, time);

	this.osc.frequency.exponentialRampToValueAtTime(.01, time + 0.25);
	this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);

	this.osc.start(time);

	this.osc.stop(time + 0.5);
};

var snare = new Snare(audioCtx);

function Snare(audioCtx) {
  this.audioCtx = audioCtx;
};

Snare.prototype.setup = function () {
  this.osc = this.audioCtx.createOscillator();
  this.osc.type = 'square';
  this.gain = this.audioCtx.createGain();
  this.osc.connect(this.gain);
  this.gain.connect(this.audioCtx.destination);
}

Snare.prototype.trigger = function(time) {
	this.setup();

	this.osc.frequency.setValueAtTime(300, time);
	this.gain.gain.setValueAtTime(.2, time);

	this.osc.frequency.exponentialRampToValueAtTime(.01, time + 0.25);
	this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);

	this.osc.start(time);

	this.osc.stop(time + 0.5);
};

var hHat = new HHat(audioCtx);

function HHat(audioCtx) {
  this.audioCtx = audioCtx;
};

HHat.prototype.setup = function () {
  this.osc = this.audioCtx.createOscillator();
  //this.osc.type = 'sawtooth';
  this.gain = this.audioCtx.createGain();
  this.osc.connect(this.gain);
  this.gain.connect(this.audioCtx.destination);
}

HHat.prototype.trigger = function(time) {
	this.setup();

	this.osc.frequency.setValueAtTime(10000, time);
	this.gain.gain.setValueAtTime(.2, time);

	this.osc.frequency.exponentialRampToValueAtTime(.01, time + 0.1);
	this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

	this.osc.start(time);

	this.osc.stop(time + 0.1);
};

function clickDrum(id) {
  var dVal = document.getElementById(id).getAttribute('data-value');
  var dIndex = document.getElementById(id).getAttribute('data-index');
  var drum = document.getElementById(id);
  if (dVal == "0") { //turning the drum pad ON
    document.getElementById(id).style.background = '#ffa500';
    drum.setAttribute('data-value', '1');
    //setting the index of the bass drum to ON
    //kick.trigger(audioCtx.currentTime);
  } else { //turning the drum pad OFF
    document.getElementById(id).style.background = '#fff';
    drum.setAttribute('data-value', '0');
  }
  //run the play function for the song here?
}

var drumHits = [];
var drumCount = 0;
var clickAmount = 0;
var buttonPlay = document.getElementById('playButton');
buttonPlay.addEventListener('click', changeStatus, true);

var drumCount = 0;
var bpm = 60000/120;

function updateTempo(val) {
  var sliderVal = document.getElementById('tempoSlider').value;
  bpm = 60000/sliderVal;
  document.getElementById('tempo').innerHTML = val;
}

function startTime() {
  var status = document.getElementById('playButton').getAttribute('data-status');
  var cTime = audioCtx.currentTime;

  if (status == 'stop') {
    //document.getElementById('time').innerHTML = cTime;
    //console.log('playing the loop');
    playDrum(drumCount);
    setTimeout(startTime, bpm);
  } else {
    return;
  }
  drumCount++;
  if (drumCount > 3) {
    drumCount = 0;
  }
}

function playDrum(index) {
  var bassId = 'bass' + index;
  var snareId = 'snare' + index;
  var hhId = 'hh' + index;
  var statusBass = document.getElementById(bassId).getAttribute('data-value');
  var statusSnare = document.getElementById(snareId).getAttribute('data-value');
  var statusHH = document.getElementById(hhId).getAttribute('data-value');

  if (statusBass == 1) {
    kick.trigger(audioCtx.currentTime);
  }
  if (statusSnare == 1) {
    snare.trigger(audioCtx.currentTime);
  }
  if (statusHH == 1) {
    hHat.trigger(audioCtx.currentTime);
  }

}

function changeStatus() {
  var button = document.getElementById('playButton');
  var status = button.getAttribute('data-status');

  if (status == 'play') {
    button.innerHTML = '-';
    button.setAttribute('data-status', 'stop');
    startTime();
  } else {
    button.innerHTML = '>';
    button.setAttribute('data-status', 'play');
  }

}

//randomizes all the frequencies at once
function randomize() {
  sine.frequency.setValueAtTime(440 * Math.random(), audioCtx.currentTime);
  sqr.frequency.setValueAtTime(440 * Math.random(), audioCtx.currentTime);
  sTooth.frequency.setValueAtTime(440 * Math.random(), audioCtx.currentTime);
}

//varies the sine wave frequency
function updateSliderSine(val) {
  //sliderDiv.innerHTML = val;
  sine.frequency.setValueAtTime(10 * val, audioCtx.currentTime);
  //document.body.style.backgroundColor = hexCalc(val);
}

//varies the square wave frequency
function updateSliderSqr(val) {
  sqr.frequency.setValueAtTime(10 * val, audioCtx.currentTime);
}

//varies the sawtooth osc
function updateSlidersTooth(val) {
  sTooth.frequency.setValueAtTime(10 * val, audioCtx.currentTime);
}

function updateVol(val) {
  val = val * 0.1;
  sineGain.gain.value = val;
  sqrGain.gain.value = val;
  sToothGain.gain.value = val;
}
//starting vol of the sawtooth

// function updateSlidersToothVol(val) {
//   sToothGain.gain.value = val;
// }

// var sToothButton = document.getElementById("sToothButton");
// //sToothButton.addEventListener('click', sToothSwitch);
// //turn on and off sTooth tone
// function sToothSwitch() {
//   if (sToothButton.value == 'start') {
//     //var val = document.getElementById("sToothSliderVol");
//     sToothGain.gain.value = .25;
//     sToothButton.value = "stop"
//   } else {
//     sToothGain.gain.value = 0;
//     sToothButton.value = "start"
//   }
// }
var feedback = audioCtx.createGain();
feedback.gain.value = 0.8;

function startDelay() {
  //sqrGain.disconnect(audioCtx.destination);
  delay.connect(feedback);
  feedback.connect(delay);
  sineGain.connect(delay);
  sToothGain.connect(delay);
  sqrGain.connect(delay);
  delay.connect(audioCtx.destination);
}

function stopDelay() {
  delay.disconnect();
}

sqr.start();
sine.start();
sTooth.start();
sineGain.connect(audioCtx.destination);
sqrGain.connect(audioCtx.destination);
sToothGain.connect(audioCtx.destination);
//sqr.connect(audioCtx.destination);
//sTooth.connect(audioCtx.destination);
//sine.connect(audioCtx.destination);
