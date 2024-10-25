import { registeredPlayers, winners } from '../db/db';
import { WebSocketRequest } from '../models/req-res.types';
import { WebSocket } from 'ws';
import sendUpdateWinners from './updateWinners';

// const usedNames = new Set<string>();
const playerRegistration = (ws: WebSocket, message: WebSocketRequest, connectionId: string) => {
  if (message.type !== 'reg') {
    console.error('playerRegistration message.type !== reg');
    return;
  }

  const { name, password } = message.data;

  // Проверка на наличие имени и пароля
  if (!name || !password) {
    ws.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({ name: null, index: null, error: true, errorText: 'Name and password are required' }),
        id: message.id,
      }),
    );
    return;
  }

  const existingPlayer = registeredPlayers[name];

  // Если игрок уже зарегистрирован
  if (existingPlayer) {
    // Если игрок уже онлайн
    if (existingPlayer.status === 'online') {
      ws.send(
        JSON.stringify({
          type: 'reg',
          data: JSON.stringify({
            name,
            index: null,
            error: true,
            errorText: 'Player is already online from another connection',
          }),
          id: message.id,
        }),
      );
      return;
    }

    // Если игрок был offline, проверяем пароль
    if (existingPlayer.status === 'offline') {
      // Проверяем совпадение пароля
      if (existingPlayer.password !== password) {
        ws.send(
          JSON.stringify({
            type: 'reg',
            data: JSON.stringify({ name, index: null, error: true, errorText: 'Invalid password' }),
            id: message.id,
          }),
        );
        return;
      }

      // Если пароль совпадает, обновляем статус и добавляем новое соединение
      existingPlayer.status = 'online';
      existingPlayer.connectionId = connectionId;
      ws.send(
        JSON.stringify({
          type: 'reg',
          data: JSON.stringify({ name, index: connectionId, error: false, errorText: '' }),
          id: message.id,
        }),
      );
      sendUpdateWinners(ws, winners);
      return;
    }
  }

  // Регистрация нового игрока
  registeredPlayers[name] = { password, status: 'online', connectionId: connectionId };
  ws.send(
    JSON.stringify({
      type: 'reg',
      data: JSON.stringify({ name, index: connectionId, error: false, errorText: '' }),
      id: message.id,
    }),
  );

  process.send?.({
    type: 'players',
    data: registeredPlayers,
  });
};

export default playerRegistration;
