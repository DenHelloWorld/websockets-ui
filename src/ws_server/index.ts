import { WebSocketServer, WebSocket } from 'ws';
import { randomUUID } from 'node:crypto';
import handleMessage from '../commands/handleMessage';
import { setStatus } from '../utils/setStatus';
import { registeredPlayers } from '../db/db';
const WS_SERVER = new WebSocketServer({ port: 3000 });

WS_SERVER.on('connection', function connection(ws: WebSocket) {
  const uuid = randomUUID();
  console.log('Client connected', uuid);

  ws.on('message', data => handleMessage(ws, data, uuid));
  ws.on('close', () => {
    console.log('Client disconnected', uuid);

    const player = Object.keys(registeredPlayers).find(
      playerName => (registeredPlayers[playerName].connectionId = uuid),
    );

    if (player) {
      setStatus(registeredPlayers, player, 'offline');
      console.log('registeredPlayers', registeredPlayers);
      process.send?.({
        type: 'players',
        data: registeredPlayers,
      });
    }
  });
});
