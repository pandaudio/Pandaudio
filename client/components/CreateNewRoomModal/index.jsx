import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateNewRoomModal = props => {
  console.log('In CreateNewRoomModal;', props);
  const history = useHistory();

  const handleClick = () => {
    const roomName = document.getElementById('create-room').value;
    document.getElementById('create-room').value = '';

    axios
      .post('/api/v1/rooms', {
        // ****** check endpoint
        roomName,
        // host: // *********************
      })
      .then(function (response) {
        console.log(response);
        history.push({
          pathname: '/room',
          state: { isHost: true, roomInfo: response },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <section className="modal-main">
        <h1>Create New Room</h1>
        {/* Have input field, have a button that will grab that input field value */}
        <input type="text" id="create-room" />
        <button type="submit" onClick={handleClick}>
          Create
        </button>
        <button type="submit" onClick={() => props.setShowCreateNewRoomModal(false)}>
          Close
        </button>
      </section>
    </div>
  );
};

export default CreateNewRoomModal;
