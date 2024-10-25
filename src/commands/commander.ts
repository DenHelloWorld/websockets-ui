import { WebSocketRequest } from '../models/req-res.types';
import { WebSocket } from 'ws';
import playerRegistration from './playerRegistration';
import { winners } from '../db/db';
import updateRoom from './updateRoom';
import sendUpdateWinners from './updateWinners';
import handleCreateRoom from './createRoom';

const wsClients: WebSocket[] = [];
const commander = (ws: WebSocket, message: WebSocketRequest, connectionId: string) => {
  if (!wsClients.includes(ws)) {
    wsClients.push(ws);
  }

  switch (message.type) {
    case 'reg':
      playerRegistration(ws, message, connectionId);
      updateRoom(wsClients);
      sendUpdateWinners(wsClients, winners);

      break;

    case 'create_room':
      handleCreateRoom(message, connectionId);
      updateRoom(wsClients);
      break;

    case 'add_user_to_room':
      console.log('add_user_to_room', message);
      break;

    default:
      console.log(ws);
      console.error('Unknown request type:', message);
  }
};

export default commander;
