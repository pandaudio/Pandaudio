const router = require('express').Router();

const roomController = require('../controllers/roomController');
const songController = require('../controllers/songController');
const apiController = require('../controllers/apiController');
const chatController = require('../controllers/chatController');

// Create new room and associated song/chat tables.
router.post(
  '/rooms',
  roomController.createRoom,
  songController.createTable,
  chatController.createChat,
  (req, res) => {
    res.status(200).json(res.locals.room);
  }
);

// Get all rooms
router.get('/rooms', roomController.getAllActive, (req, res) => {
  res.status(200).json(res.locals.activeRooms);
});

// get songs form queue
router.get('/rooms/:roomId/songs', songController.getAll, (req, res) => {
  res.status(200).json(res.locals.roomSongs)
})

// post song to queue
router.post('/rooms/:roomId/songs', songController.addSong, (req, res) => {
  res.status(200).json(res.locals.addedSong);
});

// get endpoint to grab all chat for specific room
router.get('/rooms/:roomId/chat', chatController.getAll, (req, res) => {
  res.status(200).json(res.locals.roomChat);
});

// post chat message to room for specific room
router.post('/rooms/:roomId/chat', chatController.addMessage, (req, res) => {
  res.status(200).json(res.locals.chatMessage);
});

// query songs from spotify API
router.post('/spotify/songs', apiController.search, (req, res) => {
  res.status(200).json(res.locals.searchResult);
});

module.exports = router;
