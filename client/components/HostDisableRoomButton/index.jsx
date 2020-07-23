import React from 'react';
import { useHistory } from 'react-router-dom';

const HostDisableRoomButton = props => {
  const history = useHistory();

  function handleClick(e) {
    e.preventDefault();
    // Disable Room
    // Go Back to DashBoard

    history.goBack();
  }

  return (
    <button type="submit" onClick={handleClick}>
      Close Room
    </button>
  );
};

export default HostDisableRoomButton;
