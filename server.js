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

  socket.on('subscribeToTimer', (interval) => {
    console.log('Client is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

module.exports = app;
