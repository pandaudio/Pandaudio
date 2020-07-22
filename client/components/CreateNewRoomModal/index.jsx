import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const CreateNewRoomModal = props => {
  const [roomName, setRoomName] = useState('');
  const history = useHistory();

  const handleChange = e => {
    setRoomName(e.target.value);
  };

  const handleClick = () => {
    // const roomName = document.getElementById('create-room').value;
    // document.getElementById('create-room').value = '';
    const userId = Cookies.get('uuid');
    const data = { userId, roomName };
    fetch('/api/v1/rooms', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        console.log('response is', response);
        history.push({
          pathname: '/room',
          state: { isHost: true, roomInfo: response },
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <section className="modal-main">
        <h1>Create New Room</h1>
        {/* Have input field, have a button that will grab that input field value */}
        <input type="text" id="create-room" onChange={handleChange} />
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
