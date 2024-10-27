import { WebSocket } from 'ws';
import { clients, Game, registeredPlayers } from '../db/db';
import { StartGameResponse } from '../models/req-res.interfaces';

const sendMessageToPlayersInGame = (game: Game, message: StartGameResponse) => {
  if (game && game.addShipsData?.ships) {
    const players = Object.keys(game.addShipsData.ships); // Получаем список игроков

    players.forEach(playerId => {
      const player = registeredPlayers[playerId]; // Извлечение игрока по ID
      console.log('sendMessageToPlayersInGame');
      if (player) {
        const ws: WebSocket | undefined = clients.get(player.connectionId); // Получаем WebSocket соединение

        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(message)); // Отправляем сообщение
        }
      }
    });
  }
};

export default sendMessageToPlayersInGame;