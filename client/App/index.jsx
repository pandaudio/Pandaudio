import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import RoomPage from '../components/RoomPage';
import DashboardPage from '../components/DashboardPage';
// import Chat from '../components/Chat';
// import { PrivateRoute } from './PrivateRoute';
import Cookies from 'js-cookie';

import { PLAYER_INITIALIZE } from '../store/action_types/player';
import { useDispatch } from 'react-redux';

const App = () => {
  // NOTE: This is for storing the player in the Store in case window strategy doesn't work
  // const dispatch = useDispatch();
  const accessToken = Cookies.get('accessToken');
  const [deviceId, setDeviceId] = useState("");

  let playerCheckInterval = null;

  useEffect(() => {
    playerCheckInterval = setInterval(() => {
      checkForPlayer();
    }, 1000);
  }, []);


  // checks for if Spotify is accessible then creates a new player
  const checkForPlayer = () => {
    if (window.Spotify !== null) {
      clearInterval(playerCheckInterval);
      
      // create the spotify player
      const newPlayer = new window.Spotify.Player({
        name: 'Music Zoom Player',
        getOAuthToken: cb => {
          cb(accessToken);
        },
        volume: 0.1
      });
      // create event handlers
      newPlayer.addListener('ready', data => {
        let { device_id } = data;
        console.log("Let the music play on!");
        setDeviceId(device_id);
      });

      // intialize the player connection immediatley after intializing
      newPlayer.connect();

      // NOTE: This is for storing the player in the Store in case window strategy doesn't work
      // dispatch({ type: PLAYER_INITIALIZE, payload: newPlayer });

      // store player reference in the window
      window.globalSpotifyPlayer = newPlayer;
    }
  };

  return (
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/room" component={RoomPage} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </div>
  );
};

export default App;
