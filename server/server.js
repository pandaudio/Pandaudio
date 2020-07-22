const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require("./config/passport-setup");
const songController = require('./controllers/songController');
const apiController = require('./controllers/apiController');

const app = express();
const PORT = 3000;

const authRoute = require("./routes/auth");
const apiRoute = require("./routes/api")

// Initialize passport
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/auth", authRoute);
app.use("/api", apiRoute);

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

// Test routes for songController
// app.get('/test', songController.createTable, (req, res) => {
//   res.send('done!');
// });

// app.post('/:roomId', songController.addSong, (req, res) => {
//   res.send(res.locals.addedSong);
// });

// app.delete('/test/:songId', songController.removeSong, (req, res) => {
//   res.send(res.locals.removedSong);
// });

// Test routes for apiController
// app.get('/test', apiController.search, (req, res, next) => {
//   res.send('got it!')
// })

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Untracked error caught in global error handler',
    status: 500,
    message: 'Check logs for more information',
  };

  const returnErr = Object.assign(defaultErr, err);

  // Print error in terminal
  console.log(returnErr);
  res.status(501).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
