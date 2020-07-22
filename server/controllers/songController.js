const db = require('../models/roomModels');

/**
 * Controller for the interactions with the room-songs table
 * The name of the room songs table will be in the form of a UUID + 'songs'
 * where the UUID represents a room
 */
const songController = {};

/**
 * Create a room-songs table
 * @requires roomId Provided in request params
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
      message,
    });
  }
};

/**
 * Insert a new entry for a song added to the room-songs table
 * @requires  roomId {string} UUID provided in request params
 * @requires  track {string} The name of the song
 * @requires  artist {string} The track artists
 * @requires  length {integer} The length of the song in seconds ()
 * @requires  thumbnail {string} The url of the song cover art
 * @requires  uri {string} The Spotify uri of the song
 */
songController.addSong = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { track, artist, length, thumbnail, uri } = req.body;

    const query = `
      INSERT INTO ${roomId}songs (track, artist, length, thumbnail, uri)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;

    const result = await db.query(query, [track, artist, length, thumbnail, uri]);

    res.locals.addedSong = result.rows[0];

    return next();

    // Catch errors
  } catch ({ message }) {
    return next({
      log: 'Error in songController.addSong',
      message,
    });
  }
};

/**
 * Remove a song from the room-songs table
 * @requires  roomId {string} UUID provided in request params
 * @requires  songId {integer} The id of the song in the room-songs table
 */
songController.removeSong = async (req, res, next) => {
  try {
    const { roomId, songId } = req.params;

    const query = `
      DELETE FROM ${roomId}songs
      WHERE id = $1
      RETURNING *`;

    const result = await db.query(query, [parseInt(songId)]);

    res.locals.removedSong = result.rows[0];

    return next();

    // Catch errors
  } catch ({ message }) {
    return next({
      log: 'Error in songController.removeSong',
      message,
    });
  }
};
module.exports = songController;
