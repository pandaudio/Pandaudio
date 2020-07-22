const db = require('../models/roomModels');

const userController = {};

/**
 * Retrieves and stores the user username and thumbnail to local variables
 * @requires  userId The userId from the users table
 */
userController.getUserInfo = async (req, res, next) => {
  try {
    const { userId } = req.cookies;

    const query = `
      SELECT username, thumbnail FROM users
      WHERE id = $1`;

    const result = await db.query(query, [userId]);

    // Save username to local variables
    res.locals.username = result.rows[0].username;
    res.locals.thumbnail = result.rows[0].thumbnail;

    return next();

    // Catch errors
  } catch ({ message }) {
    return next({
      log: 'Error in userController.getUsername',
      message,
    });
  }
};

module.exports = userController;
