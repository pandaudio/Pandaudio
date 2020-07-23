import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';

const URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000';
const socket = io.connect(URL);

const Chat = ({ roomId }) => {
  const uuid = Cookies.get('uuid');
  // console.log('this is your useID:   ', uuid);
  // console.log('these are your props:   ', roomId);

  const [comments, addComment] = useState([]);
  const feed = [];

  useEffect(() => {
    // Fetch chat log from db on mount, not complete
    Axios.get(`/api/v1/rooms/${roomId}/chat`)
      .then(response => {
        console.log('this is the chat response:   ', response.data);
        for (let i = response.data.length - 1; i >= 0; i--) {
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

  const handleClick = () => {
    const currentMessage = document.getElementById('chatText').value;
    document.getElementById('chatText').value = '';

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
        <div key={data.created_at}>
          <p>
            <img src={data.thumbnail} />
            <span>{data.username}:</span>
            {data.message}
            <span> {new Date().toLocaleTimeString()}</span>
          </p>
        </div>,
        // {
        //   username: data.username,
        //   text: data.message,
        //   thumbnail: data.thumbnail,
        //   created_at: new Date().toLocaleTimeString(),
        // },
      ])
    );
  });
  return (
    <div>
      <h1>Chat.js</h1>
      {comments}
      <input type="text" id="chatText" />
      <button className="firstButton" id="send" onClick={handleClick}>
        Send
      </button>
    </div>
  );
};

export default Chat;
