import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws';
import { randomUUID } from 'crypto';
import handleMessage from '../commands/handleMessage';
import updateRoom from '../commands/updateRoom';
import sendUpdateWinners from '../commands/updateWinners';
import { registeredPlayers } from '../db/db';
import { setStatus } from '../utils/setStatus';
import { Message } from '../models/commandMessage';

const WS_SERVER = new WebSocketServer({ port: 3000 });

WS_SERVER.on('connection', function connection(ws: WebSocket) {
  const uuid = randomUUID();
  console.log('Client connected', uuid);

  const duplex = createWebSocketStream(ws, { encoding: 'utf8' });

  duplex.on('error', err => {
    console.error('Stream error:', err);
  });

  duplex.on('data', async data => {
    try {
      await handleMessage(ws, data, uuid);
      await updateRoom(WS_SERVER);
      await sendUpdateWinners(WS_SERVER);
    } catch (error) {
      console.error('Error in duplex.on.data', error);
    }
    process.on('message', async (message: Message) => {
      if (message.type) {
        console.log('Received command:', message.data);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected', uuid);

    const closedPlayer = Object.keys(registeredPlayers).find(name => (registeredPlayers[name].connectionId = uuid));

    if (closedPlayer) {
      setStatus(registeredPlayers, closedPlayer, 'offline');
      console.log('registeredPlayers', registeredPlayers);
      process.send?.({
        type: 'players',
        data: registeredPlayers,
      });
    }
  });
});
