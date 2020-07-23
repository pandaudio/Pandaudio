import React from 'react';
import PropTypes from 'prop-types';

const SongOption = props => {
  const { roomId, track, artist, length, thumbnail, uri } = props;

  function handleClick(e) {
    e.preventDefault();

    const data = { roomId, track, artist, length, thumbnail, uri };
    // Functionality to add song
    fetch(`/api/v1/rooms/${roomId}/songs`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        console.log('Song Added to Queue!');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <button type="submit" onClick={handleClick}>
        Add Song to Queue
      </button>
      <span>{`Song: ${track} | Artist: ${artist} | Length: ${length}`}</span>
    </div>
  );
};

SongOption.propTypes = {
  roomId: PropTypes.number.isRequired,
  track: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
};

export default SongOption;
