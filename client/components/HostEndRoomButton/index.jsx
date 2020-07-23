import React from 'react';
import { useHistory } from 'react-router-dom';

const HostEndRoomButton = props => {
  const history = useHistory();

  function handleClick(e) {
    e.preventDefault();
    // Delete Room
    // Delete Chat
    // Go Back to DashBoard

    history.goBack();
  }

  return (
    <button type="submit" onClick={handleClick}>
      Close Room
    </button>
  );
};

export default HostEndRoomButton;
