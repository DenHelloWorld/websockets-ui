import { registeredPlayers } from '../db/db';

export const setStatus = (db: typeof registeredPlayers, name: string, status: 'online' | 'offline') => {
  if (db[name]) {
    db[name].status = status;
    console.info(`Player ${name} is now ${status}.`);
    return true;
  }

  console.error(`Player ${name} not found.`);
  return false;
};
