import React from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const HostDisableRoomButton = props => {
  const history = useHistory();

  function handleClick(e) {
    e.preventDefault();
    // Disable Room
    // Go Back to DashBoard
    const host = Cookies.get('uuid');
    const roomId = props.roomId;
    const data = { host, roomId };
    fetch('/api/v1/rooms', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        console.log('Room set to inactive');
        history.goBack();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <button type="submit" onClick={handleClick}>
      Disable Room
    </button>
  );
};

export default HostDisableRoomButton;
