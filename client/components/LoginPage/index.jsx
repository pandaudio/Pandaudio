import React from 'react';

const LoginPage = () => (
  <div>
    <h1>Login Page</h1>

    {/* TEMPORARY ANCHOR TAG */}
    <a href="/auth/spotify">Login</a>

    <button
      type="submit"
      onClick={() => {
        window.location = 'http://localhost:8080/dashboard'; // Change to Spotify
      }}
    >
      Login with Spotify
    </button>
  </div>
);

export default LoginPage;
