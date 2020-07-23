const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./config/passport-setup');
// const songController = require('./controllers/songController');
// const apiController = require('./controllers/apiController');
// const userController = require('./controllers/userController');

const PORT = process.env.PORT || 3000;
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const db = require('./models/roomModels');

const authRoute = require('./routes/auth');
const apiRoute = require('./routes/api');

// Initialize passport
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use routes
app.use('/auth', authRoute);
app.use('/api/v1', apiRoute);

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

io.on('connection', socket => {
  console.log('User connected!!', socket.id);
  socket.on('join_room', room => {
    socket.join(room);
    console.log('User joined room:   ', room);
  });

  socket.on('chat', async data => {
    console.log('Getting chat from room', data);
    // Query to get user thumbnail and username to send back to the chat room
    let query = `
      SELECT username, thumbnail FROM users
      WHERE id = '${data.uuid}'`;
    const result = await db.query(query);
    console.log('This is the user data:   ', result.rows);

    // Save data to appropriate chat table
    query = `INSERT INTO ${data.room} (content, owner) VALUES ('${data.message}', '${data.uuid}')`;
    db.query(query);

    // Emit the appropriate data back to the chat room
    io.to(data.room).emit('chat', {
      username: result.rows[0].username,
      thumbnail: result.rows[0].thumbnail,
      message: data.message,
    });
  });

  socket.on('play', async data => {
    console.log('Getting play from room', data);

    io.to(data.room).emit('play', data);
  })

  socket.on('pause', async data => {
    console.log('Getting pause from room', data);

    io.to(data.room).emit('pause', data);
  })

  socket.on('requestPlayInfo', async data => {
    console.log('Getting requestPlayInfo from room', data);

    io.to(data.room).emit('requestPlayInfo', data)
  })
});

/**
 * ***************************************
 * Serve static files in production mode *
 * ***************************************
 */
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));

  // Handle redirects
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  });
}

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

http.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
