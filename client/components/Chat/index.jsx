import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import './index.css';

const URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000';
const socket = io.connect(URL);
const moment = require('moment');

const Chat = ({ roomId }) => {
  const uuid = Cookies.get('uuid');

  const [comments, addComment] = useState([]);
  const feed = [];

  useEffect(() => {
    // Fetch chat log from db on mount, not complete
    Axios.get(`/api/v1/rooms/${roomId}/chat`)
      .then(response => {
        console.log('this is the chat response:   ', response.data);
        for (let i = 0; i < response.data.length; i++) {
          feed.push(
            <div key={i}>
              <p>
                <img src={response.data[i].thumbnail} />
                <span>{response.data[i].username}:</span>
                {response.data[i].content}
                <span> {response.data[i].created_at}</span>
              </p>
            </div>
          );
        }
        addComment(feed);
      })
      .catch(error => {
        console.log(error);
      });

    // Enter key in the input box will send messages
    document.getElementById('chatText').addEventListener('keyup', event => {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById('send').click();
      }
    });

    // Join socket when component mounts
    socket.emit('join_room', `chat${roomId}`);
  }, []);

  // Click sends message to the server socket for processing
  const handleClick = () => {
    const currentMessage = document.getElementById('chatText').value;
    document.getElementById('chatText').value = '';

    socket.emit('chat', {
      room: `chat${roomId}`,
      message: currentMessage,
      uuid,
    });
  };

  // Listen to incoming chats, update state with new comments
  socket.on('chat', data => {
    // console.log('Incoming message: ', data);
    // console.log('this is what comments looks like: ', comments);
    addComment(
      [
        <div key={data.created_at}>
          <p>
            <img src={data.thumbnail} />
            <span>{data.username}:</span>
            {data.message}
            <span> {new Date().toLocaleTimeString()}</span>
          </p>
        </div>,
      ].concat(comments)
    );
  });

  return (
    <div className="chatBox">
      <h1>Chat.js</h1>
      <div className="chatFeed">{comments}</div>
      <input type="text" id="chatText" />
      <button className="firstButton" id="send" onClick={handleClick}>
        Send
      </button>
    </div>
  );
};

export default Chat;
