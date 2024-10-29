export interface Player {
  id: string;    
  name: string;  
  password: string; 
  wins: number;  
}

class PlayerModel {
  private players: Map<string, Player> = new Map();
  private idCounter: number = 0;

  private generateId(): string {
    const timestamp = Date.now();
    return `${timestamp}-${this.idCounter++}`;
  }

  registerPlayer(name: string, password: string): Player | string {
    const existingPlayer = [...this.players.values()].find(player => player.name === name);
    if (existingPlayer) {
      return "Player name is already taken.";
    }

    const newPlayer: Player = {
      id: this.generateId(),
      name,
      password,
      wins: 0,
    };
    this.players.set(newPlayer.id, newPlayer);
    return newPlayer;
  }

  findPlayer(name: string, password: string): Player | null {
    return [...this.players.values()].find(player => player.name === name && player.password === password) || null;
  }

  incrementWins(playerId: string): boolean {
    const player = this.players.get(playerId);
    if (player) {
      player.wins += 1;
      return true;
    }
    return false;
  }

  getLeaderboard(): Array<{ name: string; wins: number }> {
    return [...this.players.values()]
      .map(player => ({ name: player.name, wins: player.wins }))
      .sort((a, b) => b.wins - a.wins);
  }
};

export default PlayerModel;