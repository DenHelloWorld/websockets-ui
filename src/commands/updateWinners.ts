import { WebSocket } from 'ws';
import { winners } from '../db/db';
const sendUpdateWinners = (clients: WebSocket[], data: typeof winners) => {
  const message = JSON.stringify({
    type: 'update_winners',
    data: JSON.stringify(data),
    id: 0,
  });

  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });

  console.log('Winners updated and sent to all clients');
};
export default sendUpdateWinners;
