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
    const { id } = res.locals.room;

    query = `
      CREATE TABLE IF NOT EXISTS chat${id} (
        id SERIAL PRIMARY KEY,
        content VARCHAR(255),
        owner VARCHAR(50),
        created_at TIMESTAMP default now()
      );`;

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
    const { roomId } = req.params;
    const { content, owner } = req.body;

    query = `INSERT INTO chat${roomId} (content, owner) VALUES ($1, $2) RETURNING *`;

    const result = await db.query(query, [content, owner]);

    res.locals.chatMessage = result.rows[0];

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
    const { roomId } = req.params;
    query = `SELECT users.username, users.thumbnail, chat${roomId}.content, chat${roomId}.created_at FROM chat${roomId} INNER JOIN users ON CAST(chat${roomId}.owner as uuid)=users.id ORDER BY created_at DESC LIMIT 50`;

    const result = await db.query(query);

    res.locals.roomChat = result.rows;
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
