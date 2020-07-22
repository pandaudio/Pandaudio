import React from 'react';
import PlaybackControls from '../PlaybackControls';
import SongSearch from '../SongSearch';

const RoomPage = props => {
  const { location } = props;
  return (
    <div>
      {location.state.isHost ? <SongSearch /> : null}
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
    </div>
  );
};

export default RoomPage;
