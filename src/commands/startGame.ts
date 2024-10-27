import { clients } from './../db/db';
import { games } from '../db/db';

const startGame = (gameId: string | number) => {
  const game = games[gameId];

  game.startGameData = {
    players: Object.keys(game.addShipsData?.ships || {}),
    isReadyToStart: true,
    currentTurn: Object.keys(game.addShipsData?.ships || [])[0],
  };
  console.log(`Game ${gameId} is ready to start. Current turn: ${JSON.stringify(game.startGameData)}`);

  game.startGameData.players.forEach(connectionId => {
    // const player = findUserByConnectionId(connectionId);
    const client = clients.get(connectionId);
    if (client) {
      // console.log('player', player?.name);
      client.send(
        JSON.stringify({
          type: 'start_game',
          data: JSON.stringify({
            ships: game.addShipsData?.ships[connectionId],
            currentPlayerIndex: game.startGameData?.currentTurn,
          }),
          id: 0,
        }),
      );
    } else {
      console.warn(`Player ${connectionId} is not registered`);
    }
  });
};

export default startGame;
