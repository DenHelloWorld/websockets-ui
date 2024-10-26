import { winners } from '../db/db';
import { WebSocketServer, WebSocket } from 'ws';
const sendUpdateWinners = async (server: WebSocketServer) => {
  const message = JSON.stringify({
    type: 'update_winners',
    data: JSON.stringify(winners),
    id: 0,
  });

  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

export default sendUpdateWinners;
