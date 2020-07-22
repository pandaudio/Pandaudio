const db = require('../models/roomModels');

const userController = {};

userController.getUsername = async (req, res, next) => {
  try {
    const { userId } = req.cookies;

    const query = `
      SELECT username FROM users
      WHERE id = $1`;

    const result = await db.query(query, [userId]);

    // Save username to local variables
    res.locals.username = result.rows[0];

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
