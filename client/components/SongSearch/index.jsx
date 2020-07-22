import React, { useState, useEffect } from 'react';
import SongOption from '../SongOption';

const SongSearch = () => {
  const [songName, setSongName] = useState('');
  const [songResults, setSongResults] = useState([]);

  // useEffect to pass songs down to SongOption component

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
          placeholder="Enter Song"
          value={songName}
          onChange={handleChange}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default SongSearch;
