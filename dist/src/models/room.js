const rooms = [];
let roomIdCounter = 1;
export const createRoom = () => {
    const newRoom = {
        id: roomIdCounter++,
        players: [],
        isActive: false,
    };
    rooms.push(newRoom);
    return newRoom;
};
export const getRooms = () => {
    return rooms;
};
export const addPlayerToRoom = (roomId, player) => {
    const room = rooms.find(r => r.id === roomId);
    if (room && room.players.length < 2) {
        room.players.push(player);
        return true;
    }
    return false;
};
export const activateRoom = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
        room.isActive = true;
        return true;
    }
    return false;
};
export default { createRoom, getRooms, addPlayerToRoom, activateRoom };
