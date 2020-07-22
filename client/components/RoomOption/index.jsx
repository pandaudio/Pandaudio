import React from 'react';

const RoomOption = props => {
  const { roomName } = props;
  return (
    <div>
      <p>{roomName}</p>
      <button type="submit">Join</button>
    </div>
  );
};
