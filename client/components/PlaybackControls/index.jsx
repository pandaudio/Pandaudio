import React, { useState, useEffect } from 'react';

const PlaybackControls = props => {
  const [songIsPaused, setPause] = useState(true);

  function handleClick(e) {
    const { playSong, pauseSong } = props;

    e.preventDefault();
    setPause(!songIsPaused);
    // Functionality to pause song

    if (songIsPaused) {
      playSong();
    } else {
      pauseSong();
    }
  }

  return (
    <button type="submit" onClick={handleClick}>
      {songIsPaused ? 'Play' : 'Pause'}
    </button>
  );
};

export default PlaybackControls;
