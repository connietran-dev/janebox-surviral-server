const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Surviral API").status(200);
});

http.listen(PORT, () => {
  console.log('Listening on: http://localhost:' + PORT);
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

module.exports = app;
