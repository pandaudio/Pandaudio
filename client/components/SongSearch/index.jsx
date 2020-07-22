import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

    axios
      .get('/api/v1/spotify/songs', {
        searchQuery: e.target.value,
        token: 
      })
      .then(function (response) {

        const songInfo = {
          nameOfSong: response.body.name,
          nameOfArtist: response.body.artists.name,
          url: response.body.href
        }

        setSongResults(songInfo); // ********
      })
      .catch(function (error) { console.log(error) });

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
      <SongOption {...{ songResults, setSongResults }} />
    </div>
  );
};

export default SongSearch;
