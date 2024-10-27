import { WebSocket } from 'ws';

interface Player {
  password: string;
  status: 'online' | 'offline';
  connectionId: string;
  name: string;
}
interface Game {
  idGame: string;
  idPlayer: string;
}
export type Room = { users: { name: string; index: string | number }[] };

export const registeredPlayers: {
  [name: string]: Player;
} = {};

export const clients: Map<string, WebSocket> = new Map();

export const winners: {
  name: string;
  wins: string;
}[] = [];

export const rooms: { [roomId: string]: Room } = {};

export const games: { [gameId: string]: Game } = {};
