import { WebSocketRequest } from '../models/req-res.types';
import { WebSocket } from 'ws';
import turn from './turn';
const handleAttack = (ws: WebSocket, message: WebSocketRequest, connectionId: string) => {
  if (message.type !== 'attack') {
    console.error('handleAddShips message.type !== attack');
    return;
  }

  console.log(`Attack ${connectionId} ${JSON.stringify(message)}`);

  turn(ws, `${message.data.gameId}`, `${message.data.indexPlayer}`);
};
export default handleAttack;
