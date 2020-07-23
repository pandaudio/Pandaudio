import React, { useState } from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlaybackControls from '../PlaybackControls';
import SongSearch from '../SongSearch';

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
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
