const router = require('express').Router();

const roomController = require('../controllers/roomController');
const songController = require('../controllers/songController');
const apiController = require('../controllers/apiController');

router.post('/room', roomController.createRoom, songController.createTable, (req, res) => {
  res.status(200).json(res.locals.room);
});

router.get('/spotify/songs', apiController.search, (req, res) => {
  res.status(200).json(res.locals.searchResult);
});

router.post('/:roomId/song', songController.addSong, (req, res) => {
  res.status(200).json(res.locals.addedSong)
});

module.exports = router;
