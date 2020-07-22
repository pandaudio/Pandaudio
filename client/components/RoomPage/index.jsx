import React from 'react';
import PlaybackControls from '../PlaybackControls';
import SongSearch from '../SongSearch';

const RoomPage = () => {
  return (
    <div>
      <SongSearch />
      <p>Room Name</p>
      <p>Host Name</p>
      <PlaybackControls />
    </div>
  );
};

export default RoomPage;
