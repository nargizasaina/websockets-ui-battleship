const handleCommand = (ws, command) => {
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
function handleRegistration(ws, data) {
    // Register player logic (add to players map and send back response)
}
function handleCreateRoom(ws) {
    // Room creation logic (add room to rooms map, update room list for all clients)
}
export {};
