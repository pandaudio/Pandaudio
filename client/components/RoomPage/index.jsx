import React from 'react';
import PlaybackControls from '../PlaybackControls';
import SongSearch from '../SongSearch';
import Chat from '../Chat';

const RoomPage = props => {
  const { location } = props;
  // console.log('you entered the location:   ', location);
  return (
    <div>
      {location.state.isHost ? <SongSearch roomId={location.state.roomInfo.id} /> : null}
      {location.state.roomInfo.id}
      <br />
      {location.state.roomInfo.room_name}
      <br />
      {location.state.roomInfo.host}
      <br />
      {location.state.roomInfo.active ? 'active' : 'inactive'}
      <br />
      {location.state.roomInfo.created_at}
      {location.state.isHost ? <PlaybackControls /> : null}
      <Chat roomId={location.state.roomInfo.id} />
    </div>
  );
};

export default RoomPage;
