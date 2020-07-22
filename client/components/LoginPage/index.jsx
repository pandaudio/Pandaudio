import React from 'react';

const LoginPage = () => (
  <div>
    <h1>Login Page</h1>
    <a href="/auth/spotify">Login with Spotify</a>
  </div>
);

export default LoginPage;

/*
    <button
      type="submit"
      onClick={() => {
        window.location = 'http://localhost:8080/dashboard'; // Change to Spotify
      }}
    >
      Login with Spotify
    </button>
*/
