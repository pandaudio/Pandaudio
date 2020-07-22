import React from 'react';

const RoomOption = props => {
  const { room } = props;
  return (
    <div>
      <p>{room.room_name}</p>
      <button type="submit">Join</button>
    </div>
  );
};

export default RoomOption;
