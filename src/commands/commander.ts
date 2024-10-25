import { WebSocketRequest } from '../models/req-res.types';
import { WebSocket } from 'ws';
import playerRegistration from './playerRegistration';
import { registeredPlayers } from '../db/db';

const commander = (ws: WebSocket, message: WebSocketRequest, uuid: string) => {
  switch (message.type) {
    case 'reg':
      playerRegistration(ws, message, uuid);
      console.log('reg', registeredPlayers);
      break;

    case 'create_room':
      console.log('create_room', message);

      break;

    case 'add_user_to_room':
      console.log('add_user_to_room', message);
      // addUserToRoom(ws, message, uuid);
      break;

    case 'add_ships':
      console.log('add_ships', message);
      // handleAddShips(ws, message);
      break;

    case 'attack':
      console.log('attack', message);
      // handleAttack(ws, message);
      break;

    case 'randomAttack':
      console.log('randomAttack', message);
      // handleRandomAttack(ws, message);
      break;

    default:
      console.log(ws);
      console.error('Unknown request type:', message);
  }
};

export default commander;
