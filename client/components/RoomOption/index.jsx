import React from 'react';
import { useHistory } from 'react-router-dom';

const RoomOption = props => {
  const history = useHistory();
  const { room } = props;

  function handleClick(e) {
    e.preventDefault();
    history.push({
      pathname: '/room',
      state: { isHost: false, roomInfo: room },
    });
  }

  return (
    <div>
      <p>{room.room_name}</p>
      <button type="submit" onClick={handleClick}>
        Join
      </button>
    </div>
  );
};

export default RoomOption;
