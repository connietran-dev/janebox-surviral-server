const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// run API on designated port (4741 in this case)
app.listen(PORT, () => {
  console.log('Listening on: http://localhost:' + PORT);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Surviral API");
});

module.exports = app;
