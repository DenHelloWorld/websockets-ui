import parseJsonOrRawData from '../utils/parseJsonOrRawData';
import validateObjectWithType from '../utils/validateObjectWithType';
import dirigueur from './dirigueur';
import { RawData, WebSocket } from 'ws';
const handleMessage = (ws: WebSocket, data: RawData, uuid: string) => {
  const parsedData = parseJsonOrRawData(data);

  if (!validateObjectWithType(parsedData)) {
    console.error('Invalid message format received:', parsedData);
    return;
  }

  // Если поле data - это строка, распарсите его
  if (typeof parsedData.data === 'string') {
    const parsedDataField = JSON.parse(parsedData.data);
    if (parsedDataField) {
      parsedData.data = parsedDataField; // Замените строку на распарсенный объект
    } else {
      console.error('Invalid data format received:', parsedData.data);
      return; // Завершите обработку, если не удалось распарсить поле data
    }
  }

  dirigueur(ws, parsedData, uuid);
};
export default handleMessage;
