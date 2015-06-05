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

window.ondevicemotion = function(event) {;
  var msg = {event: 'devicemotion', data: event};
  connection.send(JSON.stringify(msg));
};

window.ondeviceorientation = function(event) {
  var msg = {event: 'deviceorientation', data: event};
  connection.send(JSON.stringify(msg));
};

