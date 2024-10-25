import { WebSocketRequest } from '../models/req-res.types';
import { WebSocket } from 'ws';

let registeredPlayers: { [key: string]: { name: string; password: string } } = {};

const handlePlayerRegistration = (ws: WebSocket, message: WebSocketRequest, connectionId: string) => {
  if (message.type === 'reg') {
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

    if (registeredPlayers[name]) {
      ws.send(
        JSON.stringify({
          type: 'reg',
          data: JSON.stringify({ name, index: null, error: true, errorText: 'Player already exists' }),
          id: message.id,
        }),
      );
    } else {
      const index = connectionId;
      registeredPlayers[name] = { name, password };

      ws.send(
        JSON.stringify({
          type: 'reg',
          data: JSON.stringify({ name, index, error: false, errorText: '' }),
          id: message.id,
        }),
      );

      process.send?.({
        type: 'new_player',
        data: { name, index },
      });
    }
  } else {
    ws.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({ name: null, index: null, error: true, errorText: 'Invalid registration request' }),
        id: message.id,
      }),
    );
  }
};

export default handlePlayerRegistration;
