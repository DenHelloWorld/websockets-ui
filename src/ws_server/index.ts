import WebSocket, { createWebSocketStream } from 'ws';
import { randomUUID } from 'crypto';
import handleMessage from '../commands/handleMessage';
import updateRoom from '../commands/updateRoom';
import sendUpdateWinners from '../commands/updateWinners';
import { clients, registeredPlayers } from '../db/db';
import { setStatus } from '../utils/setStatus';
import { RoomOrRegMessage } from '../models/roomOrRegMessage';
import { getWsServer } from '../utils/getWsServer';

const WS_SERVER = getWsServer();

WS_SERVER.on('connection', function connection(ws: WebSocket) {
  const connectionId = randomUUID();
  clients.set(connectionId, ws);
  console.log('Client connected', connectionId);

  const duplex = createWebSocketStream(ws, { encoding: 'utf8' });

  duplex.on('error', err => {
    console.error('Stream error:', err);
  });

  duplex.on('data', async data => {
    try {
      await handleMessage(ws, data, connectionId);
      await updateRoom(WS_SERVER);
      await sendUpdateWinners(WS_SERVER);
    } catch (error) {
      console.error('Error in duplex.on.data', error);
    }
    process.on('message', async (message: RoomOrRegMessage) => {
      if (message.type) {
        console.log('Received command:', message.data);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected', connectionId);
    clients.delete(connectionId);
    const closedPlayer = Object.keys(registeredPlayers).find(
      name => (registeredPlayers[name].connectionId = connectionId),
    );

    if (closedPlayer) {
      setStatus(registeredPlayers, closedPlayer, 'offline');
    }
  });
});
