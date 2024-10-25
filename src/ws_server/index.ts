import { WebSocketServer, WebSocket } from 'ws';
import { randomUUID } from 'node:crypto';
import handleMessage from '../handlers/handleMessage';
const WS_SERVER = new WebSocketServer({ port: 3000 });

WS_SERVER.on('connection', function connection(ws: WebSocket) {
  const uuid = randomUUID();
  console.log('Client connected', uuid);

  ws.on('message', data => handleMessage(ws, data, uuid));
});
