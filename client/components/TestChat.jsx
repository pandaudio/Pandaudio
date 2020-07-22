import React, { useState } from 'react';

const socket = io.connect('http://localhost:3000');

const Chat = props => {
  // const handleClick = () => {
  //   socket.emit('join_room', 'a room id');
  //   socket.emit('chat', {
  //     room: 'a room id', // UUID params
  //     message: 'I made it into the first room',
  //   });
  //   socket.emit('chat', {
  //     room: 'a room id', // UUID params
  //     message: 'I made it into the first room ANOTHER MESSagE',
  //   });
  // };
  const handleClick2 = () => {
    socket.emit('join_room', 'a second room id');
    socket.emit('chat', {
      room: 'a second room id', // UUID params
      message: 'I made it into the second room',
    });
  };
  socket.on('chat', data => {
    console.log('In TestChat.jsx', data);
  });
  // socket.on('chat', data => {
  //   console.log('You sent it from second room', data);
  // });
  return (
    <div>
      <h1>Chat.js</h1>
      {/* <button className="firstButton" onClick={handleClick}>
        Click!!
      </button> */}
      <hr />
      <button className="secondButton" onClick={handleClick2}>
        Click2!!
      </button>
    </div>
  );
};

export default Chat;
