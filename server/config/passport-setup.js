const passport = require("passport");
require("dotenv").config()

const SpotifyStrategy = require('passport-spotify').Strategy;

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: '/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      // User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
      //   return done(err, user);
      // });

      const spotifyId = profile.id;
      
    }
  )
);