import React from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const RoomOption = props => {
  const history = useHistory();
  const { room } = props;
  const uuid = Cookies.get('uuid');

  function handleClick(e) {
    const {
      room: { host },
    } = props;

    e.preventDefault();
    history.push({
      pathname: '/room',
      state: { isHost: host === uuid ? true : false, roomInfo: room },
    });
  }

  return (
    <div className="roomOption">
      <p>{room.room_name}</p>
      <button type="submit" onClick={handleClick}>
        Join
      </button>
    </div>
  );
};

export default RoomOption;
