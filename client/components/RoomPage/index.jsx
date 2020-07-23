import React, { useEffect, useState } from 'react';
import PlaybackControls from '../PlaybackControls';
import SongSearch from '../SongSearch';

const RoomPage = props => {
  const { location } = props;
  console.log(location)

  // initialize a isHost state to be false by default
  const [isHost, setIsHost] = useState(false);

  let player = null;

  useEffect(() => {

    // check if user is host, then set isHost State to true
    console.log(props.location.roomInfo)

    player = window.globalSpotifyPlayer;

    // example spotify URI
    // spotify:track:3OIHgTyQdiAGMmpjQaNxp3

    // TEST: Play a song upon room entering
    // console.log('this is the player', player)
    // playSong(player)

    // onload of room post message to websocket asking for the current song URI and time

    // add listeners of websocket to play a song at a certain time

    // add listener of websocket to pause a song

  }, [])

  // post message to websocket asking for the current song URI and time

  // add listeners of websocket to play a song at a certain time

  // add listener of websocket to pause a song

  // helper to play a song
  const playSong = (player) => {
    
    // function to play song from spotify API
    const play = ({
      spotify_uri,
      playerInstance: {
        _options: {
          getOAuthToken,
          id
        }
      }
    }) => {
      getOAuthToken(access_token => {
        console.log('we are in the get oauth', access_token, id)
        console.log('this is the spotify uri', spotify_uri)
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
        });
      });
    };

    console.log('before we call play', player)

    play({
      playerInstance: player,
      spotify_uri: 'spotify:track:3OIHgTyQdiAGMmpjQaNxp3',
    });
  }


  return (
    <div>
      {location.state.isHost ? <SongSearch roomId={location.state.roomInfo.id} /> : null}
      {location.state.roomInfo.id}
      <br />
      {location.state.roomInfo.room_name}
      <br />
      {location.state.roomInfo.host}
      <br />
      {location.state.roomInfo.active ? 'active' : 'inactive'}
      <br />
      {location.state.roomInfo.created_at}
      {location.state.isHost ? <PlaybackControls /> : null}
    </div>
  );
};

export default RoomPage;
