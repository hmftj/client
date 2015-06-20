var connection = new WebSocket('ws://' + location.host + '/socket');

connection.onopen = function () {

};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log('Server: ' + e.data);
};

/*
window.ondevicemotion = function(event) {;
  var msg = {event: 'devicemotion', data: event};
  connection.send(JSON.stringify(msg));
};
*/

window.ondeviceorientation = function(event) {
  var msg = {event: 'deviceorientation', data: event};
  connection.send(JSON.stringify(msg));
};

const STICK_RADIUS = 50.0;

var joystick = new VirtualJoystick({
  container: document.getElementById('container'),
  limitStickTravel: true,
  stickRadius: STICK_RADIUS,
  strokeStyle: '#676c80',
  mouseSupport: true,
});

joystick.addEventListener('touchstart', function(){
  console.log('down')
});

joystick.addEventListener('touchend', function(){
  console.log('up')
});

setInterval(function(){
  var x = joystick.deltaX() / STICK_RADIUS,
      y = joystick.deltaY() / STICK_RADIUS;

  connection.send(JSON.stringify({event: 'joystickmove', data: [x, y]}));
}, 1/50 * 1000);
