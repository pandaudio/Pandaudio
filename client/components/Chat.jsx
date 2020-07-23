import React, { useState } from 'react';
import Cookies from 'js-cookie';

const socket = io.connect('http://localhost:3000');

const Chat = props => {
  const uuid = Cookies.get('uuid');
  console.log('this is your useID:   ', uuid);

  const [comments, addComment] = useState([
    // { username: 'Michael', text: 'Whatup', thumbnail: 'thumbnail', created_at: 'today' },
  ]);
  // comments = [{username, text, thumbnail, created_at}]
  const feed = [];

  for (let i = 0; i < comments.length; i++) {
    feed.push(
      <div key={i}>
        <p>
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
    socket.emit('join_room', 'a room id');
    socket.emit('chat', {
      room: 'a room id', // UUID params
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
          username: uuid,
          text: data,
          thumbnail: 'thumbnail',
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
