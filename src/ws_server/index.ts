import WebSocket, { createWebSocketStream } from 'ws';
import { randomUUID } from 'node:crypto';
import handleMessage from '../commands/handleMessage';
import updateRoom from '../commands/updateRoom';
import sendUpdateWinners from '../commands/updateWinners';
import { clients } from '../db/db';
import { getWsServer } from '../utils/getWsServer';
import processDisconnect from '../utils/removeOnDisconnect';

const WS_SERVER = getWsServer();

WS_SERVER.on('connection', (ws: WebSocket) => {
  const connectionId = randomUUID();
  clients.set(connectionId, ws);
  console.warn('Client connected', connectionId);

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
  });
  ws.on('close', async () => {
    console.log('Client disconnected via ws.close', connectionId);
    await processDisconnect(connectionId);
    clients.delete(connectionId);
  });
});
