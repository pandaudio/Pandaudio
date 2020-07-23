import React from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const HostDisableRoomButton = props => {
  const history = useHistory();

  function handleClick(e) {
    e.preventDefault();
    // Disable Room
    // Go Back to DashBoard
    const data = Cookies.get('uuid');
    fetch('/api/v1/rooms', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        history.goBack();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <button type="submit" onClick={handleClick}>
      Close Room
    </button>
  );
};

export default HostDisableRoomButton;
