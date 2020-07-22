import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateNewRoomModal from '../CreateNewRoomModal';
import RoomOption from '../RoomOption';
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

  useEffect(() => {
    axios
      .get('/api/v1/rooms')
      .then(function (response) {
        const rooms = [];
        for (let i = 0; i < response.data.length; i += 1) {
          rooms.push(<RoomOption room={response.data[i]} key={i} />);
        }
        setAllRooms(rooms);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <button type="submit" onClick={() => setShowCreateNewRoomModal(true)}>
        Create Room
      </button>
      {showCreateNewRoomModal && (
        <CreateNewRoomModal {...{ showCreateNewRoomModal, setShowCreateNewRoomModal }} />
      )}
      {allRooms}
    </div>
  );
};

export default DashboardPage;
