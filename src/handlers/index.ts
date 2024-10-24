import { WebSocketRequest } from '../models/req-res.types';

const websocketHandler = (message: WebSocketRequest) => {
  switch (message.type) {
    case 'reg':
      console.log('reg', message);
      // handlePlayerRegistration(ws, message);
      break;

    case 'create_room':
      console.log('create_room', message);
      // handleCreateRoom(ws, message);
      break;

    case 'add_user_to_room':
      console.log('add_user_to_room', message);
      // handleAddUserToRoom(ws, message);
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
      console.error('Unknown request type:', message);
  }
};

export default websocketHandler;
