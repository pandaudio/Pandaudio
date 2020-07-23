import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { SONG_QUEUE_ADD } from '../../store/action_types/songQueue';

const SongOption = props => {
  const { roomId, track, artist, length, thumbnail, uri } = props;
  const dispatch = useDispatch();

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
      .then(data => {
        console.log('Song Added to Queue!');
        
        dispatch({type: SONG_QUEUE_ADD, payload: data})
        // dispatch response data to redux
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
