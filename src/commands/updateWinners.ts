import { WebSocket } from 'ws';
import { winners } from '../db/db';
const sendUpdateWinners = (ws: WebSocket, data: typeof winners) => {
  ws.send(
    JSON.stringify({
      type: 'update_winners',
      data: JSON.stringify(data),
      id: 0,
    }),
  );
};
export default sendUpdateWinners;