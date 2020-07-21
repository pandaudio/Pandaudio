const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require("./config/passport-setup");

const app = express();
const PORT = 3000;

const authRoute = require("./routes/auth-route");

// Initialize passport
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/auth", authRoute);

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
