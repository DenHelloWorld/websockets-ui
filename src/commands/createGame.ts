import { randomUUID } from 'crypto';
import { clients, games, registeredPlayers, Room } from '../db/db';
import { WebSocket } from 'ws';
const createGame = (room: Room, gameId: string) => {
  room.users.forEach(user => {
    const player = registeredPlayers[user.name];

    if (player && player.status === 'online') {
      const client = clients.get(player.connectionId);

      if (client instanceof WebSocket) {
        const idPlayer = randomUUID();
        const gameMessage = {
          type: 'create_game',
          data: JSON.stringify({
            idGame: gameId,
            idPlayer: idPlayer,
          }),
          id: 0,
        };

        client.send(JSON.stringify(gameMessage));
        games[gameId] = {
          idGame: gameId,
          idPlayer: idPlayer,
        };
        console.log(`Game started for player ${user.name} in game ${gameId}`);
      } else {
        console.warn(`WebSocket not found for player ${user.name}.`);
      }
    } else {
      console.warn(`Player ${user.name} is not online or does not exist.`);
    }
  });
};
export default createGame;
