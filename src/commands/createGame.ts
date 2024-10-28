import { randomUUID } from 'crypto';
import { clients, Game, games, registeredPlayers, Room } from '../db/db';
import { WebSocket } from 'ws';
const createGame = (room: Room, gameId: string) => {
  if (!games[gameId]) {
    games[gameId] = {
      beforeStartData: {
        idGame: gameId,
        idPlayer: '',
      },
    };
  }
  room.users.forEach(user => {
    const player = registeredPlayers[user.name];

    if (player && player.status === 'online') {
      const client = clients.get(player.connectionId);

      if (client instanceof WebSocket) {
        const idPlayer = randomUUID();
        const createGameData: Game['beforeStartData'] = {
          idGame: gameId,
          idPlayer: idPlayer,
        };

        const gameMessage = {
          type: 'create_game',
          data: JSON.stringify(createGameData),
          id: 0,
        };

        client.send(JSON.stringify(gameMessage));
        games[gameId].beforeStartData = createGameData;
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
