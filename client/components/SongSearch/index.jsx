import React, { useState, useEffect } from 'react';

const SongSearch = () => {
  const [songName, setSongName] = useState('');
  const [songResults, setSongResults] = useState([]);

  function handleChange(e) {
    setSongName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Functionality to search for song
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="searchbar"
          defaultValue="Enter Song"
          value={songName}
          onChange={handleChange}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};
