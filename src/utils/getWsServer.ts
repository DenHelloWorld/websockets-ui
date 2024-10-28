import { WebSocketServer } from 'ws';

let instance: WebSocketServer;

export const getWsServer = () => {
  if (!instance) {
    instance = new WebSocketServer({ port: 3000 });
  }
  return instance;
};
