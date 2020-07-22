import React from 'react';
import PropTypes from 'prop-types';

/**
 * Insert a new entry for a song added to the room-songs table
 * @requires  roomId {string} UUID provided in request params
 * @requires  track {string} The name of the song
 * @requires  artist {string} The track artists
 * @requires  length {integer} The length of the song in seconds ()
 * @requires  thumbnail {string} The url of the song cover art
 * @requires  uri {string} The Spotify uri of the song
 */

const SongOption = props => {
  // const { songName, artist, songResults, setSongResults } = props; *****
  const { roomId, track, artist, length, thumbnail, uri } = props;

  function handleClick(e) {
    e.preventDefault();
    // Functionality to add song
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

/*
SongOption.defaultProps = {
  artist: '-',
};
*/

SongOption.propTypes = {
  roomId: PropTypes.string.isRequired,
  track: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  length: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
};

export default SongOption;
