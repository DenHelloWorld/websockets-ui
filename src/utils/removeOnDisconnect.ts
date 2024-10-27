import { registeredPlayers } from '../db/db';
import findUserByConnectionId from './findUserByConnectionId';
import { setStatus } from './setStatus';

const processDisconnect = async (connectionId: string) => {
  try {
    const user = await findUserByConnectionId(connectionId);
    if (user) {
      setStatus(registeredPlayers, user.name, 'offline');
      console.warn(`${user.name} was disconnected.`);
    }
  } catch (e) {
    const error = e as Error;
    console.error(error.message);
  }

};
export default processDisconnect;
