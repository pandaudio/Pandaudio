import React, { useState } from 'react';

const socket = io.connect('http://localhost:3000');

const Chat = props => {
  const [comments, addComment] = useState([]);
  // comments = [{username, text, thumbnail, created_at}]
  const feed = [];

  for (let i = 0; i < comments.length; i++) {
    feed.push(
      <div key={i}>
        <p>
          <span>{comments[i].username}: </span>
          {comments[i].text}
          <span> {comments[i].created_at}</span>
        </p>
      </div>
    );
  }
  const handleClick = () => {
    socket.emit('join_room', 'a room id');
    socket.emit('chat', {
      room: 'a room id', // UUID params
      message: 'I made it into the first room',
    });
  };
  socket.on('chat', data => {
    console.log('In Chat.jsx', data);
  });
  return (
    <div>
      <h1>Chat.js</h1>
      {comments}
      <button className="firstButton" onClick={handleClick}>
        Click!!
      </button>
    </div>
  );
};

export default Chat;
