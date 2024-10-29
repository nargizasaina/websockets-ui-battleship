class PlayerModel {
    players = new Map();
    idCounter = 0;
    generateId() {
        const timestamp = Date.now();
        return `${timestamp}-${this.idCounter++}`;
    }
    registerPlayer(name, password) {
        const existingPlayer = [...this.players.values()].find(player => player.name === name);
        if (existingPlayer) {
            return "Player name is already taken.";
        }
        const newPlayer = {
            id: this.generateId(),
            name,
            password,
            wins: 0,
        };
        this.players.set(newPlayer.id, newPlayer);
        return newPlayer;
    }
    findPlayer(name, password) {
        return [...this.players.values()].find(player => player.name === name && player.password === password) || null;
    }
    incrementWins(playerId) {
        const player = this.players.get(playerId);
        if (player) {
            player.wins += 1;
            return true;
        }
        return false;
    }
    getLeaderboard() {
        return [...this.players.values()]
            .map(player => ({ name: player.name, wins: player.wins }))
            .sort((a, b) => b.wins - a.wins);
    }
}
;
export default PlayerModel;
