import { WebSocket } from 'ws';
import { clients, Game, registeredPlayers } from '../db/db';
import { StartGameResponse } from '../models/req-res.interfaces';

const sendMessageToPlayersInGame = (game: Game, message: StartGameResponse) => {
  if (game && game.addShipsData?.ships) {
    const players = Object.keys(game.addShipsData.ships);

    players.forEach(playerId => {
      const player = registeredPlayers[playerId];
      console.log('sendMessageToPlayersInGame');
      if (player) {
        const ws: WebSocket | undefined = clients.get(player.connectionId);

        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(message));
        }
      }
    });
  }
};

export default sendMessageToPlayersInGame;
