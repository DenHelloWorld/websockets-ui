import { WebSocketRequest } from '../models/req-res.types';
import { WebSocket } from 'ws';
import playerRegistration from './playerRegistration';
import handleCreateRoom from './createRoom';
import addUserToRoom from './addUserToRoom';

const commander = (ws: WebSocket, message: WebSocketRequest, connectionId: string) => {
  switch (message.type) {
    case 'reg':
      playerRegistration(ws, message, connectionId);
      break;

    case 'create_room':
      handleCreateRoom(message, connectionId);
      break;

    case 'add_user_to_room':
      addUserToRoom(ws, message, connectionId);
      break;

    default:
      console.log(ws);
      console.error('Unknown request type:', message);
  }
};

export default commander;
