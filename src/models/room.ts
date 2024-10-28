export interface Player {
  name: string;
  id: number;
}

export interface Room {
  id: number;
  players: Player[];
  isActive: boolean;
}

const rooms: Room[] = [];
let roomIdCounter = 1;

export const createRoom = (): Room => {
  const newRoom: Room = {
    id: roomIdCounter++,
    players: [],
    isActive: false,
  };
  rooms.push(newRoom);
  return newRoom;
};

export const getRooms = (): Room[] => {
  return rooms;
};

export const addPlayerToRoom = (roomId: number, player: Player): boolean => {
  const room = rooms.find(r => r.id === roomId);
  if (room && room.players.length < 2) {
      room.players.push(player);
      return true;
  }
  return false;
};

export const activateRoom = (roomId: number): boolean => {
  const room = rooms.find(r => r.id === roomId);
  if (room) {
      room.isActive = true;
      return true;
  }
  return false;
};

export default { createRoom, getRooms, addPlayerToRoom, activateRoom };