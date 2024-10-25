import { registeredPlayers } from '../db/db';

const findUserByConnectionId = (connectionId: string) => {
  return Object.values(registeredPlayers).find(player => player.connectionId === connectionId);
};
export default findUserByConnectionId;
