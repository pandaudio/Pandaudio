import React, { useEffect, useState } from 'react';
import PlaybackControls from '../PlaybackControls';
import SongSearch from '../SongSearch';
import Chat from '../Chat';

const socket = io.connect('http://localhost:3000');

const RoomPage = props => {
  const {
    location: {
      state: { isHost, roomInfo },
    },
  } = props;

  let player = null;
  const spotify_uri = 'spotify:track:3OIHgTyQdiAGMmpjQaNxp3';

  useEffect(() => {
    player = window.globalSpotifyPlayer;

    // example spotify URI
    // spotify:track:3OIHgTyQdiAGMmpjQaNxp3

    // TEST: Play a song upon room entering
    // console.log('this is the player', player)
    // playSong(player)

    // join song room when page is loaded is loaded
    socket.emit('join_room', `song${roomInfo.id}`);

    // onload of room post message to websocket asking for the current song URI and time

    // add listeners of websocket to play a song at a certain time
    socket.on('play', data => {
      console.log('Incoming message: ', data);
      playSong(player, data.spotify_uri, data.start_time)
    })

    // add listener of websocket to pause a song
    socket.on('pause', data => {
      console.log('Incoming message: ', data);
      pauseSong(player)
    })
  }, []);

  // post message to websocket asking for the current song URI and time

  // add listeners of websocket to play a song at a certain time

  // add listener of websocket to pause a song

  // helper to play a song
  const playSong = (player, spotify_uri, start_time) => {
    // function to play song from spotify API
    const play = ({
      spotify_uri,
      playerInstance: {
        _options: { getOAuthToken, id },
      },
      start_time = 0,
    }) => {
      getOAuthToken(access_token => {
        console.log('we are in the get oauth', access_token, id);
        console.log('this is the spotify uri', spotify_uri);
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotify_uri], position_ms: start_time }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        });
      });
    };

    console.log('before we call play', player);

    play({
      playerInstance: player,
      spotify_uri,
      start_time
    });
  };

  const pauseSong = player => {
    player.pause().then(() => {
      console.log('Paused!');
    });
  };

  const handlePlay = (e) => {
    // **** TODO: Pass in dyanmic URI from the queue ****
    // **** TODO: Pass song name, album image, etc ****
    socket.emit('play', {
      room: `song${roomInfo.id}`,
      spotify_uri,
      start_time: 0,
    });
  }

  const handlePause = (e) => {
    socket.emit('pause', {
      room: `song${roomInfo.id}`
    })
  }

  // console.log('you entered the location:   ', location);
  return (
    <div>
      {isHost ? <SongSearch roomId={roomInfo.id} /> : null}
      {roomInfo.id}
      <br />
      {roomInfo.room_name}
      <br />
      {roomInfo.host}
      <br />
      {roomInfo.active ? 'active' : 'inactive'}
      <br />
      {roomInfo.created_at}
      {isHost ? (
        <PlaybackControls
          playSong={() => {
            handlePlay();
          }}
          pauseSong={() => {
            handlePause();
          }}
        />
      ) : null}
      <Chat roomId={roomInfo.id} />
    </div>
  );
};

export default RoomPage;
