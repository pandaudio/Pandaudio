const router = require('express').Router();

const roomController = require('../controllers/roomController');
const songController = require('../controllers/songController')

router.post('/room', roomController.createRoom, songController.createTable, (req, res) => {
  res.status(200).json(res.locals.data)
})

router.post('/:roomId/song', songController.addSong, (req, res) => {
  
})

module.exports = router;