import { RawData } from 'ws';
import { WebSocketRequest } from '../models/req-res.types';

const parseJsonOrRawData = (data: RawData | string): WebSocketRequest | string => {
  let parsedData: WebSocketRequest | string;

  try {
    parsedData = JSON.parse(data.toString());
  } catch (e) {
    parsedData = data.toString();
  }
  return parsedData;
};

export default parseJsonOrRawData;
