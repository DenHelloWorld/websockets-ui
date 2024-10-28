import { registeredPlayers } from '../db/db';

const findUserByIndexPlayer = (indexPlayer: string) => {
  return Object.values(registeredPlayers).find(player => player.indexPlayer === indexPlayer);
};
export default findUserByIndexPlayer;
