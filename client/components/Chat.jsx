import React, { useState } from 'react';
import Cookies from 'js-cookie';

const socket = io.connect('http://localhost:3000');

const Chat = ({ roomId }) => {
  const uuid = Cookies.get('uuid');
  console.log('this is your useID:   ', uuid);
  console.log('these are your props:   ', roomId);

  const [comments, addComment] = useState([
    // { username: 'Michael', text: 'Whatup', thumbnail: 'thumbnail', created_at: 'today' },
  ]);
  // comments = [{username, text, thumbnail, created_at}]
  const feed = [];

  for (let i = 0; i < comments.length; i++) {
    feed.push(
      <div key={i}>
        <p>
          <img src={comments[i].thumbnail} />
          <span>{comments[i].username}:</span>
          {comments[i].text}
          <span> {comments[i].created_at}</span>
        </p>
      </div>
    );
  }

  const handleClick = () => {
    const currentMessage = document.getElementById('chatText').value;
    document.getElementById('chatText').value = '';
    socket.emit('join_room', `chat${roomId}`);
    socket.emit('chat', {
      room: `chat${roomId}`, // UUID params
      message: currentMessage,
      uuid,
    });
  };

  socket.on('chat', data => {
    console.log('Incoming message: ', data);
    console.log('this is what comments looks like: ', comments);
    addComment(
      comments.concat([
        {
          username: data.username,
          text: data.message,
          thumbnail: data.thumbnail,
          created_at: new Date().toLocaleTimeString(),
        },
      ])
    );
  });
  return (
    <div>
      <h1>Chat.js</h1>
      {feed}
      <input type="text" id="chatText" />
      <button className="firstButton" onClick={handleClick}>
        Send
      </button>
    </div>
  );
};

export default Chat;
