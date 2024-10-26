import { rooms } from '../db/db';
import { WebSocketServer, WebSocket } from 'ws';

const updateRoom = async (wsServer: WebSocketServer) => {
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

  wsServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
export default updateRoom;
