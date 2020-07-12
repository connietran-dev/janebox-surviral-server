const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInGame } = require('./users.js');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const router = require('./router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

server.listen(PORT, () => {
  console.log('Listening on: http://localhost:' + PORT);
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join', ({ name, game }, callback) => {
    console.log(name, game);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

module.exports = app;
