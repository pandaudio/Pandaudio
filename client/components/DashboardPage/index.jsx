import React, { useState, useEffect } from 'react';
import CreateNewRoomModal from '../CreateNewRoomModal';

/**
 * Component: RoomPage
 * Component: CreateRoom Modal
 * render: button create room name
 */
const DashboardPage = () => {
  // state hook for a new room name
  const [newRoomName, setNewRoomName] = useState({ roomName: '' });
  const [showCreateNewRoomModal, setShowCreateNewRoomModal] = useState(false);
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {}, []);

  return (
    <div>
      <h1>This is a DashboardPage</h1>
      <button type="submit" onClick={() => setShowCreateNewRoomModal(true)}>
        Create Room
      </button>
      {showCreateNewRoomModal && (
        <CreateNewRoomModal {...{ showCreateNewRoomModal, setShowCreateNewRoomModal }} />
      )}
    </div>
  );
};

export default DashboardPage;
