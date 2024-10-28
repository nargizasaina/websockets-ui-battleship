import WebSocket from 'ws';
import PlayerModel from '../models/player';
import { Player } from '../models/player';

const handleCommand = (ws: WebSocket, command: any) => {
  switch (command.type) {
    case 'reg':
      handleRegistration(ws, command.data);
      break;
    case 'create_room':
      handleCreateRoom(ws);
      break;
    // Add additional cases for other commands (add_user_to_room, add_ships, attack, etc.)
    default:
      console.log(`Unknown command: ${command.type}`);
      ws.send(JSON.stringify({ error: "Unknown command" }));
  }
};

function handleRegistration(ws: WebSocket, data: any) {
  // Register player logic (add to players map and send back response)
}

function handleCreateRoom(ws: WebSocket) {
  // Room creation logic (add room to rooms map, update room list for all clients)
}