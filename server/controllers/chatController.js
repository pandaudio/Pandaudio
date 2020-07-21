const db = require('../models/roomModels');

/**
 * Controller for interactions with room tables
 */
const chatController = {};

let query = '';
/**
 * Create chat table for room if none exists
 */
chatController.createChat = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    query = `
      CREATE TABLE IF NOT EXISTS chat${roomId} (
        id SERIAL PRIMARY KEY,
        content VARCHAR(255),
        owner VARCHAR(50),
        created_at TIMESTAMP default now()
      )`;

    await db.query(query);
    return next();
  } catch ({ message }) {
    return next({
      log: 'Error in chat.createChat',
      status: 500,
      message,
    });
  }
};

/**
 * Add chat message to chat table based on room id
 */
chatController.addMessage = async (req, res, next) => {
  try {
    const { roomId, content, owner } = req.params;

    query = `INSERT INTO chat${roomId}(content, owner) VALUES (${content}, ${owner})`;

    await db.query(query);
    return next();
  } catch ({ message }) {
    return next({
      log: 'Error in chat.addMessage',
      status: 500,
      message,
    });
  }
};

/**
 * Get chat history (up to 50 messages) from roomId
 */
chatController.getAll = async (req, res, next) => {
  try {
    const { roomId } = req.body;
    query = `SELECT * FROM chat${roomId} LIMIT 50`;

    const result = await db.query(query);
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
