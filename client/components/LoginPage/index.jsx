import React from 'react';
import './index.css';

const LoginPage = () => (
  <div className="login">
    <div className="login-border">
      {/* <h1>Login with Spotify!</h1> */}

      <a href="/auth/spotify">
        <img
          className="spotifyIMG"
          src=" https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png"
          alt="not rendering"
        />
      </a>
    </div>
  </div>
);

export default LoginPage;
