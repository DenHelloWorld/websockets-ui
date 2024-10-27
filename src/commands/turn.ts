import { WebSocket } from 'ws';
import { games } from '../db/db';

const turn = (ws: WebSocket, gameId: string, indexPlayer: string) => {
  console.warn();
  const turnData = {
    type: 'turn',
    data: JSON.stringify({
      currentPlayer: indexPlayer,
    }),
    id: 0,
  };

  games[gameId].startGameData?.players.forEach(savedIndex => {
    if (savedIndex === indexPlayer) {
      ws.send(JSON.stringify(turnData));
    } else {
      console.log(`players:`, JSON.stringify(games[gameId].startGameData?.players));
      console.warn('turn', `savedIndex:`, savedIndex, 'indexPlayer:', indexPlayer);
    }
  });
};

export default turn;
