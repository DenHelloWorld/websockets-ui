import { WebSocket } from 'ws';
import { WebSocketRequest } from '../models/req-res.types';
import { rooms } from '../db/db';
import findUserByConnectionId from '../utils/findUserByConnectionId';

const addUserToRoom = (ws: WebSocket, message: WebSocketRequest, connectionId: string) => {
  if (message.type !== 'add_user_to_room') {
    console.error('playerRegistration message.type !== add_user_to_room');
    return;
  }

  const { indexRoom } = message.data;
  const room = rooms[indexRoom];

  if (!room) {
    console.error(`Room with index ${indexRoom} does not exist`);
    return;
  }
  const player = findUserByConnectionId(connectionId);
  if (player) {
    room.users.push({ name: player.name, index: indexRoom });
    console.log(`Added user to room ${indexRoom}:`, JSON.stringify(room, null, 2));
    delete rooms[indexRoom];
  } else {
    console.error(`Player with connectionId ${connectionId} does not exist`);
    return;
  }
};

export default addUserToRoom;
