import parseJsonOrRawData from '../utils/parseJsonOrRawData';
import { safeJsonParse } from '../utils/safeJsonParse';
import validateObjectWithType from '../utils/validateObjectWithType';
import commander from './commander';
import { RawData, WebSocket } from 'ws';
const handleMessage = async (ws: WebSocket, data: RawData, uuid: string) => {
  let parsedData = parseJsonOrRawData(data);

  if (!validateObjectWithType(parsedData)) {
    console.error('Invalid message format received:', parsedData);
    return;
  }

  if (typeof parsedData.data === 'string') {
    const parsedPayloadField = safeJsonParse(parsedData.data);
    console.log('Parsed payload:', parsedPayloadField);
    parsedData.data = parsedPayloadField;
  } else {
    console.error('Data is not a string:', parsedData.data);
    return;
  }

  commander(ws, parsedData, uuid);
};
export default handleMessage;
