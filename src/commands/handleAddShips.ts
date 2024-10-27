import { games, registeredPlayers } from '../db/db';
import { WebSocketRequest } from '../models/req-res.types';
import { WebSocket } from 'ws';
import startGame from './startGame';
import findUserByConnectionId from '../utils/findUserByConnectionId';

const handleAddShips = (ws: WebSocket, message: WebSocketRequest, connectionId: string) => {
  if (message.type !== 'add_ships') {
    console.error('handleAddShips message.type !== add_ships');
    return;
  }

  const { gameId, ships, indexPlayer } = message.data;
  // Write indexPlayer to users that in room
  const user = findUserByConnectionId(connectionId);
  if (user) {
    user.indexPlayer = indexPlayer;
  } else {
    console.warn('User in handleAddShips was not found');
  }

  if (!gameId || !ships || !Array.isArray(ships) || ships.length === 0 || !indexPlayer) {
    ws.send(
      JSON.stringify({
        type: 'add_ships',
        data: JSON.stringify({
          error: true,
          errorText: 'Invalid data: gameId, ships array, and indexPlayer are required.',
        }),
        id: message.id,
      }),
    );
    return;
  }
  const game = games[gameId];
  if (!game) {
    ws.send(
      JSON.stringify({
        type: 'add_ships',
        data: JSON.stringify({
          error: true,
          errorText: 'Game not found.',
        }),
        id: message.id,
      }),
    );
    return;
  }

  if (!game.addShipsData) {
    game.addShipsData = {
      gameId: gameId,
      ships: {},
    };
  }

  if (!game.addShipsData.ships[connectionId]) {
    game.addShipsData.ships[connectionId] = [];
  }

  game.addShipsData.ships[connectionId] = ships;

  console.log(`Ships added for player ${connectionId} in game ${gameId}`);
  if (Object.keys(game.addShipsData.ships).length === 2) {
    startGame(gameId);
  }
};
export default handleAddShips;
