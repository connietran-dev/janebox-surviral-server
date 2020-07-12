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

  // Joining Game
  socket.on('join', ({ name, game }, callback) => {
    console.log("Username:", name, "Game:", game);

    const { error, user } = addUser({ id: socket.id, name, game });

    if (error) return callback(error);

    // After adding user, emit admin message and broadcast to all users in room
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the game ${user.game}` });
    
    socket.broadcast.to(user.game).emit('message', { user: 'admin', text: `${user.name} has joined the game ${user.game}!`});

    // If no errors, socket will join the user to the room (ie, game)
    socket.join(user.game);

    // If there are no errors, this will not be called
    callback();
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

module.exports = app;
