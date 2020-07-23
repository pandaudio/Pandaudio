import React, { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useStore, useDispatch } from 'react-redux';
import moment from 'moment';
import PlaybackControls from '../PlaybackControls';
import SongSearch from '../SongSearch';
import HostDisableRoomButton from '../HostDisableRoomButton';
import Chat from '../Chat';
import { SONG_QUEUE_UPDATE } from '../../store/action_types/songQueue';
import './index.scss';

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
  const [songQueueReady, setSongQueueReady] = useState(false);
  const [initialPlay, setInitialPlay] = useState(false);
  const dispatch = useDispatch();
  const store = useStore();
  const playerState = useSelector(state => state.player);
  const songQueueState = useSelector(state => state.songQueue);
  // hard coded pokemon song

  useEffect(() => {
    // setup fetch data method when component loads intially
    setup();

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

      // only play song if the targetGuest is my own socket.id or if its falsy (broadcast to everyone to play)
      if (data.targetGuest === socket.id || !data.targetGuest) {
        playSong(window.globalSpotifyPlayer, data.spotify_uris, data.start_time);
      }
    });

    // add listener of websocket to pause a song
    socket.on('pause', data => {
      console.log('Incoming message: ', data);
      pauseSong(window.globalSpotifyPlayer);
    });
  }, []);

  const setup = () => {
    // async call to get all songs and dispatch to songQueue store

    fetch(`/api/v1/rooms/${roomInfo.id}/songs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'appplication/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('grabbed all the songs from db', data);
        dispatch({ type: SONG_QUEUE_UPDATE, payload: data });
        setSongQueueReady(true);
      });
  };

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

          const trackWindow = store.getState().player.data.track_window;
          const currentTrack = trackWindow.current_track;
          const nextTracks = trackWindow.next_tracks;
          const tracks = [currentTrack, ...nextTracks];

          socket.emit('play', {
            room: `song${roomInfo.id}`,
            spotify_uris: tracks.map(track => track.uri),
            start_time: progress_ms,
            targetGuest: requestData.targetGuest,
          });
        });
    });
  };

  // helper to play a song
  const playSong = (player, spotify_uris, start_time) => {
    // function to play song from spotify API
    const play = ({
      spotify_uris,
      playerInstance: {
        _options: { getOAuthToken, id },
      },
      start_time = 0,
    }) => {
      getOAuthToken(access_token => {
        console.log('we are in the get oauth', access_token, id);
        console.log('this is the spotify uri', spotify_uris);
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: spotify_uris, position_ms: start_time }),
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
      spotify_uris,
      start_time,
    });
  };

  const pauseSong = player => {
    player.pause().then(() => {
      console.log('Paused!');
    });
  };

  const handlePlay = e => {
    let uris;

    if (!initialPlay) {
      uris = songQueueState.data.map(song => song.uri);
      setInitialPlay(true);
    } else {
      const trackWindow = store.getState().player.data.track_window;
      const currentTrack = trackWindow.current_track;
      const nextTracks = trackWindow.next_tracks;
      const tracks = [currentTrack, ...nextTracks];

      uris = tracks.map(track => track.uri);
    }

    socket.emit('play', {
      room: `song${roomInfo.id}`,
      spotify_uris: uris,
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
    <div className="room-page">
      <div className="room-content">
        {location.state.isHost ? (
          <div className="addsong-container">
            <button className="btn-addsong" type="submit" onClick={toggleOpen}>
              Add Song
            </button>
            <HostDisableRoomButton roomId={location.state.roomInfo.id} />
            <Modal open={open} onClose={toggleOpen} className={classes.modal}>
              <div className={classes.paper}>
                <SongSearch roomId={location.state.roomInfo.id} />
              </div>
            </Modal>
          </div>
        ) : null}
        <div className="room-header">
          {/* {location.state.roomInfo.id} */}
          <h2>{roomInfo.room_name}</h2>
          <p>{`Host: ${roomInfo.host}`}</p>
          <p>
            {`Uptime: ${Math.floor(
              moment.duration(moment(roomInfo.created_at, 'HH:mm:ss').diff(moment())).asMinutes()
            )} minutes`}
          </p>
        </div>
        {isHost && playerState.ready && songQueueReady ? (
          <div className="playback-control-container">
            <PlaybackControls
              playSong={() => {
                handlePlay();
              }}
              pauseSong={() => {
                handlePause();
              }}
            />
          </div>
        ) : null}
      </div>
      <div className="room-chat">
        <Chat roomId={roomInfo.id} />
      </div>
    </div>
  );
};

export default RoomPage;
