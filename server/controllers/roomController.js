const db = require('../models/roomModels');

/**
 * Controller for interactions with room tables
 */
const roomController = {};

let query = '';
/**
 * Get all rooms (from the rooms table) that are active (True)
 */
roomController.getAllActive = async (req, res, next) => {
  try {
    query = 'SELECT * FROM rooms WHERE rooms.active = True;';
    const result = await db.query(query);
    res.locals.activeRooms = result.rows;
    return next();
  } catch ({ message }) {
    return next({
      log: 'Error in room.getAllActive',
      status: 500,
      message,
    });
  }
};

/**
 * Set the room (UUID - in the rooms table) to active (True)
 */
roomController.makeActive = async (req, res, next) => {
  try {
    const roomId = req.body.id;
    query = 'UPDATE rooms SET active = True WHERE uuid = $1';
    const values = [roomId];
    await db.query(query, values);
    return next();
  } catch ({ message }) {
    return next({
      log: 'Error in room.makeActive',
      status: 500,
      message,
    });
  }
};
/**
 * Set the room (UUID - in the rooms table) to inactive (False)
 */
roomController.makeInactive = async (req, res, next) => {
  try {
    const roomId = req.body.uuid;
    query = 'UPDATE rooms SET active = False WHERE uuid = $1';
    const values = [roomId];
    await db.query(query, values);
    return next();
  } catch ({ message }) {
    return next({
      log: 'Error in room.makeActive',
      status: 500,
      message,
    });
  }
};

/**
 * Create new room entry in room table
 */
roomController.createRoom = async (req, res, next) => {
  try {
    const { roomName, userId } = req.body;

    query = 'INSERT INTO rooms (room_name, active, host) VALUES ($1, True, $2) RETURNING *';
    const values = [roomName, userId];
    const room = await db.query(query, values);

    res.locals.room = room.rows[0];

    return next();
  } catch ({ message }) {
    return next({
      log: 'Error in room.createRoom',
      status: 500,
      message,
    });
  }
};

module.exports = roomController;
