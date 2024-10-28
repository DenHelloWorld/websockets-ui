import { WebSocketRequest } from '../models/req-res.types';
import { rooms } from '../db/db';
import { randomUUID } from 'node:crypto';
import findUserByConnectionId from '../utils/findUserByConnectionId';

const handleCreateRoom = (message: WebSocketRequest, connectionId: string) => {
  if (message.type === 'create_room') {
    const newRoomId = randomUUID();
    const user = findUserByConnectionId(connectionId);

    if (user) {
      if (user.room) {
        delete rooms[user.room];
      }

      user.room = newRoomId;
      rooms[newRoomId] = {
        users: [
          {
            name: user.name,
            index: user.connectionId,
          },
        ],
      };

      console.log(`User ${user.name} created and joined room ${newRoomId}`);
    } else {
      console.warn(`User with connectionId ${connectionId} not found.`);
    }
  }
};

export default handleCreateRoom;
