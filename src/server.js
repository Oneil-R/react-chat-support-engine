const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send('Message received: ' + message);  // Echo back the message
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:5000');
