import { registeredPlayers } from '../db/db';
import { WebSocketRequest } from '../models/req-res.types';
import { WebSocket } from 'ws';

const handleReg = (ws: WebSocket, message: WebSocketRequest, connectionId: string) => {
  if (message.type !== 'reg') {
    console.error('playerRegistration message.type !== reg');
    return;
  }

  const { name, password } = message.data;

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

  if (existingPlayer) {
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

    if (existingPlayer.status === 'offline') {
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

      existingPlayer.status = 'online';
      existingPlayer.connectionId = connectionId;
      ws.send(
        JSON.stringify({
          type: 'reg',
          data: JSON.stringify({ name, index: connectionId, error: false, errorText: '' }),
          id: message.id,
        }),
      );
      return;
    }
  }

  registeredPlayers[name] = { password, status: 'online', connectionId: connectionId, name };
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

export default handleReg;
