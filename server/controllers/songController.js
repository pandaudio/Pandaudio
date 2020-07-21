const db = require('../models/roomModels');

/**
 * Controller for the interactions with the room-songs table
 */
const songController = {};

/**
 * Create a songs table for a particular room
 */
songController.createTable = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const query = `
      CREATE TABLE IF NOT EXISTS ${roomId}songs (
        id SERIAL PRIMARY KEY,
        track VARCHAR(50),
        artist VARCHAR(50),
        length INTEGER,
        thumbnail VARCHAR(100),
        uri VARCHAR(100)
      )`;

    await db.query(query);

    return next();

    // Catch errors
  } catch ({ message }) {
    return next({
      log: 'Error in songController.createTable',
      status: 500,
      message,
    });
  }
};

songController.addSong = async (req, res, next) => {}

module.exports = songController;
