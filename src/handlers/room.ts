import { WebSocket } from 'ws';
import { randomUUID } from 'node:crypto';
import { AddUserToRoomRequest, CreateRoomRequest } from '../models/req-res.interfaces';
import { registeredPlayers } from './playerRegistration';

export interface User {
  index: string;
  name: string;
}

export interface Room {
  users: User[];
}

let rooms: { [key: string]: Room } = {};
let availableRooms: { [key: string]: Room } = { ...rooms };
// Автоматически добавлять юзера, который вызвал 'create_room'
export const createRoom = (ws: WebSocket, message: CreateRoomRequest, uuid: string) => {
  if (message.type === 'create_room' && message.data === '') {
    const roomId = randomUUID();
    rooms[roomId] = { users: [] };

    const userName = registeredPlayers[uuid]?.name || 'Unknown Player';

    const user: User = {
      index: uuid,
      name: userName,
    };

    rooms[roomId].users.push(user);

    updateRoom(ws, roomId, rooms[roomId].users);

    console.log(`Room created with ID: ${roomId}`);
  }
};

export const updateRoom = (ws: WebSocket, roomId: string, roomUsers: User[]) => {
  ws.send(
    JSON.stringify({
      type: 'update_room',
      data: JSON.stringify([
        {
          roomId: roomId,
          roomUsers: rooms[roomId].users,
        },
      ]),
      id: 0,
    }),
  );
};

export const addUserToRoom = (
  ws: WebSocket,
  message: { type: 'add_user_to_room'; data: { indexRoom: string }; id: number },
  uuid: string,
) => {
  const { indexRoom } = message.data;

  if (!rooms[indexRoom]) {
    // Если комната не существует
    ws.send(
      JSON.stringify({
        type: 'add_user_to_room',
        data: { error: true, errorText: 'Room not found' },
        id: message.id,
      }),
    );
    return;
  }

  const room = rooms[indexRoom];
  if (room.users.length >= 2) {
    // Если комната уже заполнена
    ws.send(
      JSON.stringify({
        type: 'add_user_to_room',
        data: { error: true, errorText: 'Room is full' },
        id: message.id,
      }),
    );
    return;
  }

  // Получаем имя пользователя по UUID
  const userName = registeredPlayers[uuid]?.name || 'Unknown Player';
  const user: User = {
    index: uuid,
    name: userName,
  };

  // Добавляем пользователя в комнату
  room.users.push(user);

  // Если комната теперь заполнена, удаляем её из списка доступных
  if (room.users.length === 2) {
    delete availableRooms[indexRoom];

    // Отправляем сообщение о начале игры обоим пользователям в комнате
    room.users.forEach(userInRoom => {
      ws.send(
        JSON.stringify({
          type: 'create_game',
          data: {
            idGame: indexRoom,
            idPlayer: userInRoom.index,
          },
          id: message.id,
        }),
      );
    });
  } else {
    // Уведомляем всех в комнате об обновлении её состояния
    room.users.forEach(userInRoom => {
      ws.send(
        JSON.stringify({
          type: 'update_room',
          data: [
            {
              roomId: indexRoom,
              roomUsers: room.users,
            },
          ],
          id: message.id,
        }),
      );
    });
  }

  console.log(`User ${userName} added to room with ID: ${indexRoom}`);
};

