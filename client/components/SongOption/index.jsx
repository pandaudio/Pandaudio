import React from 'react';
import PropTypes from 'prop-types';

const SongOption = props => {
  const { songName, artist } = props;

  function handleClick(e) {
    e.preventDefault();
    // Functionality to add song
  }

  return (
    <div>
      <button type="submit" onClick={handleClick}>
        Add Song to Queue
      </button>
      <p>{songName}</p>
      <p>{artist}</p>
    </div>
  );
};

SongOption.defaultProps = {
  artist: '-',
};

SongOption.propTypes = {
  songName: PropTypes.string.isRequired,
  artist: PropTypes.string,
};
