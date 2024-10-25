import { WebSocket } from 'ws';
import { randomUUID } from 'node:crypto';
import { AddUserToRoomRequest, CreateRoomRequest } from '../models/req-res.interfaces';

export interface User {
  index: string;
}

export interface Room {
  users: User[];
}

let rooms: { [key: string]: Room } = {};

export const createRoom = (ws: WebSocket, message: CreateRoomRequest, uuid: string) => {
  if (message.type === 'create_room' && message.data === '') {
    const roomId = randomUUID();
    rooms[roomId] = { users: [] };


    const user = {
      index: `${uuid}`,
    };

    rooms[roomId].users.push(user);


    ws.send(
      JSON.stringify({
        type: 'update_room',
        data: JSON.stringify([
          {
            roomId: roomId,
            roomUsers: rooms[roomId].users,
          },
        ]),
        id: message.id,
      }),
    );

    console.log(`Room created with ID: ${roomId}`);
  } else {

    ws.send(
      JSON.stringify({
        type: 'update_room',
        data: JSON.stringify([
          {
            roomId: null,
            roomUsers: [],
          },
        ]),
        id: message.id,
      }),
    );
  }
};

export const updateRoom = (ws: WebSocket, messageId: number) => {
  const availableRooms = Object.keys(rooms).map(roomId => ({
    roomId,
    roomUsers: rooms[roomId].users,
  }));

  ws.send(
    JSON.stringify({
      type: 'update_room',
      data: JSON.stringify(availableRooms),
      id: messageId,
    }),
  );
};

export const addUserToRoom = (ws: WebSocket, message: AddUserToRoomRequest, connectionId: string) => {
  const room = rooms[message.data.indexRoom];

  if (room) {
    room.users.push({ index: connectionId });

    if (room.users.length === 2) {
      const idGame = randomUUID();
      room.users.forEach(user => {
        ws.send(
          JSON.stringify({
            type: 'create_game',
            data: JSON.stringify({ idGame, idPlayer: user.index }),
            id: message.id,
          }),
        );
      });
      delete rooms[message.data.indexRoom];
    }
  } else {
    ws.send(
      JSON.stringify({
        type: 'add_user_to_room',
        data: JSON.stringify({ error: true, errorText: 'Room does not exist' }),
        id: message.id,
      }),
    );
  }
};
