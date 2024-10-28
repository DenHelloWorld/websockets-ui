import { clients, games } from '../db/db';

import findUserByIndexPlayer from '../utils/findUserByIndexPlayer';

const startGame = (gameId: string | number) => {
  const game = games[gameId];

  if (!game) {
    console.warn(`Game with ID ${gameId} does not exist.`);
    return;
  }

  const players = Object.keys(game.addShipsData?.ships || {});

  players.forEach(indexPlayer => {
    const player = findUserByIndexPlayer(indexPlayer);
    if (player) {
      const client = clients.get(player.connectionId);
      if (client) {
        const ships = game.addShipsData?.ships[indexPlayer];

        const message = {
          type: 'start_game',
          data: JSON.stringify({
            ships: ships,
            currentPlayerIndex: indexPlayer,
          }),
          id: 0,
        };

        client.send(JSON.stringify(message));
      }
    }
  });
};

export default startGame;
