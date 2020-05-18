const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
require('./socketHandler')(io)

app.use(router);


server.listen(PORT, () => {
  console.log(`Server is using port ${PORT}`);
});
