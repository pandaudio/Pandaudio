const authController = {}

authController.getAccessToken = (req, res, next) => {
  const { accessToken } = req.cookies;
  res.locals.accessToken = accessToken;
  next();
};

authController.saveAccessToken = (req, res, next) => {
  const { user } = req;

  res.cookie("accessToken", user.accessToken, { maxAge: 360000 });
  res.cookie("userId", user.userId, { maxAge: 360000 });
  next();
};

module.exports = authController;