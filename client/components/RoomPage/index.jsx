import React, { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlaybackControls from '../PlaybackControls';
import SongSearch from '../SongSearch';
import Chat from '../Chat';
import axios from 'axios';
import { useSelector, useStore } from 'react-redux';

const URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000';
const socket = io.connect(URL);

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const RoomPage = props => {
  const {
    location: {
      state: { isHost, roomInfo },
    },
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const playerState = useSelector(state => state.player);
  // hard coded pokemon song
  const spotify_uri = 'spotify:track:3OIHgTyQdiAGMmpjQaNxp3';

  useEffect(() => {
    // join song room when page is loaded is loaded
    socket.emit('join_room', `song${roomInfo.id}`);

    // onload of room post message to websocket asking for the current song URI and time
    if (!isHost) {
      socket.emit('requestPlayInfo', {
        room: `song${roomInfo.id}`,
        targetGuest: socket.id,
      });
    }

    if (isHost) {
      socket.on('requestPlayInfo', data => {
        // emit a special play message back to ONLY that guest requester
        console.log('host receive requests for play Info', data);
        getPlayerInfoAndEmit(window.globalSpotifyPlayer, data);
      });
    }

    // add listeners of websocket to play a song at a certain time
    socket.on('play', data => {
      console.log('Incoming play message: ', data);

      //only play song if the targetGuest is my own socket.id or if its falsy (broadcast to everyone to play)
      if (data.targetGuest === socket.id || !data.targetGuest) {
        playSong(window.globalSpotifyPlayer, data.spotify_uri, data.start_time);
      }
    });

    // add listener of websocket to pause a song
    socket.on('pause', data => {
      console.log('Incoming message: ', data);
      pauseSong(window.globalSpotifyPlayer);
    });
  }, []);

  const getPlayerInfoAndEmit = (player, requestData) => {
    const {
      _options: { getOAuthToken },
    } = player;

    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then(response => response.json())
        .then(playerInfo => {
          const {
            item: { uri },
            progress_ms,
          } = playerInfo;

          socket.emit('play', {
            room: `song${roomInfo.id}`,
            spotify_uri: uri,
            start_time: progress_ms,
            targetGuest: requestData.targetGuest,
          });
        });
    });
  };

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
      start_time,
    });
  };

  const pauseSong = player => {
    player.pause().then(() => {
      console.log('Paused!');
    });
  };

  const handlePlay = e => {
    // **** TODO: Pass in dynamic URI from the queue ****
    // **** TODO: Pass song name, album image, etc ****

    socket.emit('play', {
      room: `song${roomInfo.id}`,
      spotify_uri,
      start_time: playerState.data.position || 0,
    });
  };

  const handlePause = e => {
    socket.emit('pause', {
      room: `song${roomInfo.id}`,
    });
  };

  const toggleOpen = e => {
    e.preventDefault();
    setOpen(!open);
  };

  const { location } = props;
  return (
    <div>
      {location.state.isHost ? (
        <div>
          <button type="submit" onClick={toggleOpen}>
            Add Song
          </button>
          <Modal open={open} onClose={toggleOpen} className={classes.modal}>
            <div className={classes.paper}>
              <SongSearch roomId={location.state.roomInfo.id} />
            </div>
          </Modal>
        </div>
      ) : null}
      {location.state.roomInfo.id}
      <br />
      {roomInfo.room_name}
      <br />
      {roomInfo.host}
      <br />
      {roomInfo.active ? 'active' : 'inactive'}
      <br />
      {roomInfo.created_at}
      {isHost && playerState.ready ? (
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
