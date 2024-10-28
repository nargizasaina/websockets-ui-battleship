import { WebSocketServer } from 'ws';
import { httpServer } from "./src/http_server/index";

const HTTP_PORT = 8181;

const wss = new WebSocketServer({server: httpServer}); 
console.log(`WebSocket server started on ws://localhost:${HTTP_PORT}`);

wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    ws.on('message', (message) => {
      console.log(`Received command: ${message}`);
    });

    ws.on('close', (close) => {
      console.log('WebSocket connection closed');
    });

    ws.send('Welcome to the WebSocket server!');
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
