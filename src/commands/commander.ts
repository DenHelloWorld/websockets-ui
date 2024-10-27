import { WebSocketRequest } from '../models/req-res.types';
import { WebSocket } from 'ws';
import handleCreateRoom from './handleCreateRoom';
import handleAddUserToRoom from './handleAddUserToRoom';
import handleReg from './handleReg';
import handleAddShips from './handleAddShips';
import handleAttack from './handleAttack';

const commander = (ws: WebSocket, message: WebSocketRequest, connectionId: string) => {
  switch (message.type) {
    case 'reg':
      handleReg(ws, message, connectionId);
      break;

    case 'create_room':
      handleCreateRoom(message, connectionId);
      break;

    case 'add_user_to_room':
      handleAddUserToRoom(message, connectionId);
      break;

    case 'add_ships':
      handleAddShips(ws, message, connectionId);
      break;
    case 'attack':
      handleAttack(ws, message, connectionId);
      break;

    default:
      console.error('Unknown request type:', message);
  }
};

export default commander;
