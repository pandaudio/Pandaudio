const passport = require("passport");
require("dotenv").config()

const SpotifyStrategy = require('passport-spotify').Strategy;

const db = require("../models/roomModels.js");

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: '/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {

      const { id, display_name, images } = profile;

      const body = { accessToken }

      const selectQuery = `
        SELECT * FROM users 
        WHERE spotifyId='${id}'`;

      const insertQuery = `
        INSERT INTO users (spotifyId, display_name) 
        VALUES ($1, $2) 
        RETURNING *`;

        db.query(selectQuery)
        .then((data) => {
          // User exists in database
          if (data.rows.length) {
            body.userId = data.rows[0].spotfiyId;
            return done(null, body);
          }

          // User does not exist, add user to database
          db.query(insertQuery, [id, display_name])
            .then((user) => {
              body.userId = user.rows[0].spotfiyId;
              return done(null, body);
            })
            .catch((err) => console.log("INSERT QUERY", err));
        })
        .catch((err) => console.log("SELECT QUERY", err));

    }
  )
);

/**  Configure Passport authenticated session persistence.
 *
 * In order to restore authentication state across HTTP requests, Passport needs
 * to serialize users into and deserialize users out of the session.  We
 * supply the user ID when serializing, and query the user record by ID
 * from the database when deserializing.
 **/

passport.serializeUser(function (user, done) {
  console.log('IN SERIALIZE ', user);
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  const findUserQuery = `SELECT * FROM users WHERE id = $1`;
  db.query(findUserQuery, [id]).then((user) => {
    done(null, user); // done is used to progress to the next middleware
  });
});

module.exports = passport.deserializeUser;