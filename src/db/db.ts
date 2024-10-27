interface Player {
  password: string;
  status: 'online' | 'offline';
  connectionId: string;
  name: string;
}

export const registeredPlayers: {
  [name: string]: Player;
} = {};

export const winners: {
  name: string;
  wins: string;
}[] = [];

// export const rooms: { [roomId: string]: { users: { name: string; index: string }[] } } = {};
type Room = { users: { name: string; index: string | number }[] };
export const rooms: { [roomId: string]: Room } = {};
// export const availableRooms: { [roomId: string]: { users: { name: string; index: string }[] } } = {};
