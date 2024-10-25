import { WebSocketRequest } from '../models/req-res.types';
import { rooms } from '../db/db';
import { randomUUID } from 'node:crypto';
import findUserByConnectionId from '../utils/findUserByConnectionId';

const handleCreateRoom = (message: WebSocketRequest, connectionId: string) => {
  if (message.type === 'create_room') {
    const newRoomId = randomUUID();
    const user = findUserByConnectionId(connectionId);

    if (user) {
      rooms[newRoomId] = {
        users: [
          {
            name: user.name,
            index: user.connectionId,
          },
        ],
      };
    }
  }
};
export default handleCreateRoom;
