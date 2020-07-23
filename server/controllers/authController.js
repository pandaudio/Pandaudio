const authController = {};

authController.getAccessToken = (req, res, next) => {
  const { accessToken } = req.cookies;
  res.locals.accessToken = accessToken;
  next();
};

authController.saveAccessToken = (req, res, next) => {
  const { user } = req;

  res.cookie('accessToken', user.accessToken, { maxAge: 36000000 });
  res.cookie('uuid', user.userId, { maxAge: 36000000 });
  next();
};

module.exports = authController;
