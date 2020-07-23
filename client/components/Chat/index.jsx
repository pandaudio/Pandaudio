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
          addComment(
            comments.push({
              username: response.data[i].username,
              text: response.data[i].content,
              thumbnail: response.data[i].thumbnail,
              created_at: response.data[i].created_at,
            })
          );
        }
        // response.data.forEach(data => {
        //   addComment(
        //     comments.push({
        //       username: data.username,
        //       text: data.content,
        //       thumbnail: data.thumbnail,
        //       created_at: data.created_at,
        //     })
        //   );
        // console.log('this is what your comments on mount looks like   ', comments);
        // });
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

    socket.emit('join_room', `chat${roomId}`);
  }, []);

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
      <button className="firstButton" id="send" onClick={handleClick}>
        Send
      </button>
    </div>
  );
};

export default Chat;
