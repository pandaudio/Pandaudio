import React from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const HostDisableRoomButton = props => {
  const history = useHistory();

  function handleClick(e) {
    e.preventDefault();
    // Disable Room
    // Go Back to DashBoard
    const uuid = Cookies.get('uuid');
    const data = { uuid };
    fetch('/api/v1/disableroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
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
