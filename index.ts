import { WebSocketServer } from 'ws';
import { httpServer } from "./src/http_server/index.js";
import PlayerModel from './src/models/player.js';

const HTTP_PORT = 8181;

const wss = new WebSocketServer({server: httpServer}); 
console.log(`WebSocket server started on ws://localhost:${HTTP_PORT}`);

wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');

  ws.on('message', (message) => {
    const stringedMessage = message.toString();
    try {
      const data = JSON.parse(stringedMessage);
      console.log(`Received command: ${stringedMessage}`);
      const player = new PlayerModel();
      if (typeof data.data === 'string') {
        const innerData = JSON.parse(data.data);
        console.log('Inner data:', innerData);
      
        if (data.type === 'reg') {
          const {name, password} = innerData;
          player.registerPlayer(name, password);
          ws.send(JSON.stringify({
            type: 'reg',
            data: {
                name: innerData.name,
                index: 0,
                error: false,
                errorText: ''
            }
        }));
        }
      }
      
    } catch(err) {
      console.error(err);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format. Please send valid JSON.'
    }));
    }
    console.log(`Received command: ${message}`);
  });

  ws.on('close', (close) => {
    console.log('WebSocket connection closed');
  });

  ws.send('Welcome to the WebSocket server!');
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
