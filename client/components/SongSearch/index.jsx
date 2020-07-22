import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
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
    const accessToken = Cookies.get('accesstoken');
    const data = { token: accessToken, searchQuery: songName };

    fetch('/api/v1/spotify/songs', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        /*
        console.log('response is', response);
        history.push({
          pathname: '/room',
          state: { isHost: true, roomInfo: response },
        });
        */
        const songOptions = [];
        for (let i = 0; i < response.length; i += 1) {
          songOptions.push(<SongOption />);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

    /**
     * Insert a new entry for a song added to the room-songs table
     * @requires  roomId {string} UUID provided in request params
     * @requires  track {string} The name of the song
     * @requires  artist {string} The track artists
     * @requires  length {integer} The length of the song in seconds ()
     * @requires  thumbnail {string} The url of the song cover art
     * @requires  uri {string} The Spotify uri of the song
     */
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
