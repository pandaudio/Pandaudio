import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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
        // dispatch response data to redux
        dispatch({type: SONG_QUEUE_ADD, payload: data})
        
        //add to player queue
        window.globalSpotifyPlayer._options.getOAuthToken(access_token => {
            fetch(`https://api.spotify.com/v1/me/player/queue?uri=${data.uri}`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then(response => response.json())
          .then(data => {
            console.log('added to player queue!!!')
          })
        })


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
