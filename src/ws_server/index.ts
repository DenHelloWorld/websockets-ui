import { WebSocketServer } from 'ws';
import parseJsonOrRawData from '../utils/parseJsonOrRawData';
import websocketHandler from '../handlers';
import validateObjectWithType from '../utils/validateObjectWithType';

const WS_SERVER = new WebSocketServer({ port: 3000 });

WS_SERVER.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function message(data) {
    const parsedData = parseJsonOrRawData(data);

    validateObjectWithType(parsedData)
      ? websocketHandler(parsedData)
      : console.error('Invalid message format received:', parsedData);
  });
});
