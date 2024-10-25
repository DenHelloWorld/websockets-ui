import { rooms } from '../db/db';
import { WebSocket } from 'ws';

const updateRoom = (clients: WebSocket[]) => {

      const roomData = Object.keys(rooms).map(roomId => ({
        roomId,
        roomUsers: rooms[roomId].users.map(user => ({
          name: user.name,
          index: user.index,
        })),
      }));

  const message = JSON.stringify({
    type: 'update_room',
    data: JSON.stringify(roomData),
    id: 0,
  });

  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });

  console.log('Rooms updated and sent to all clients');
};
export default updateRoom;
