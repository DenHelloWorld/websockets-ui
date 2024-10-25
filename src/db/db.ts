export const registeredPlayers: {
  [name: string]: {
    password: string;
    status: 'online' | 'offline';
    connectionId: string;
  };
} = {};
export const winners: {
  name: string;
  wins: string;
}[] = [];
