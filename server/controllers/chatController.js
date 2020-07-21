const db = require('../models/roomModels');

/**
 * Controller for interactions with room tables
 */
const chatController = {};

let query = '';
/**
 * Create chat table for room if none exists
 */
chatController.createChat = async (req, res, next) => {};

/**
 * Add chat message to chat table based on room id
 */
chatController.addMessage = async (req, res, next) => {};

/**
 * Get all chat history from roomId
 */
chatController.getAll = async (req, res, next) => {
  try {
    const roomId = req.body.roomId;
    query = 'SELECT * FROM rooms WHERE roomid = $1';
    const values = [roomId];
    const result = await db.query(query, values);
    res.locals.roomChat = result.rows[0];
    return next();
  } catch ({ message }) {
    return next({
      log: 'Error in chat.getAll',
      status: 500,
      message,
    });
  }
};
module.exports = chatController;
