import React, { useState, useEffect } from 'react';

const PlaybackControls = () => {
  const [songIsPaused, setPause] = useState(true);

  function handleClick(e) {
    e.preventDefault();
    setPause(!songIsPaused);
    // Functionality to pause song
  }

  return (
    <div>
      <button type="submit" onClick={handleClick}>
        {songIsPaused ? 'Play' : 'Pause'}
      </button>
    </div>
  );
};

export default PlaybackControls;
