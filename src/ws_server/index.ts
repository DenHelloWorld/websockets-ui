import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const httpServer = createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('HTTP Server is running\n');
});

const WS_SERVER = new WebSocketServer({ server: httpServer });

WS_SERVER.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('dfhfghfg');
});

httpServer.listen(3000, () => {
  console.log('Start ws on the 3000 port!');
});
