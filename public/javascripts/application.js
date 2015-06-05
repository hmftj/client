var connection = new WebSocket('ws://' + location.host + '/socket');

connection.onopen = function () {
  connection.send('Hello server!');
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log('Server: ' + e.data);
};

window.ondevicemotion = function(event) {
  connection.send(JSON.stringify(event));
};

window.ondeviceorientation = function(event) {
  connection.send(JSON.stringify(event));
};

