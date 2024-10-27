import { WebSocket } from 'ws';

interface Player {
  password: string;
  status: 'online' | 'offline';
  connectionId: string;
  name: string;
  indexPlayer?: number | string;
}

export interface Ship {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

export interface Game {
  beforeStartData?: {
    idGame: string;
    idPlayer: string;
  };

  addShipsData?: {
    gameId: string | number;
    ships: { [indexPlayer: string]: Ship[] };
  };

  startGameData?: {
    players: string[];
    isReadyToStart: boolean;
    currentTurn: string;
  };
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
