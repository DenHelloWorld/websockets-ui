import { WebSocketRequest } from '../models/req-res.types';
import { WebSocket } from 'ws';
import handleCreateRoom from './createRoom';
import handleAddUserToRoom from './handleAddUserToRoom';
import handleReg from './handleReg';

const commander = (ws: WebSocket, message: WebSocketRequest, connectionId: string) => {
  switch (message.type) {
    case 'reg':
      handleReg(ws, message, connectionId);
      break;

    case 'create_room':
      handleCreateRoom(message, connectionId);
      break;

    case 'add_user_to_room':
      handleAddUserToRoom(ws, message, connectionId);
      break;

    default:
      console.log(ws);
      console.error('Unknown request type:', message);
  }
};

export default commander;
