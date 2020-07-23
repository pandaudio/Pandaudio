import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateNewRoomModal from '../CreateNewRoomModal';
import RoomOption from '../RoomOption';
/**
 * render component: CreateRoom Modal
 * render: button create room name
 */

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

const DashboardPage = () => {
  // state hook for a new room name
  // const [showCreateNewRoomModal, setShowCreateNewRoomModal] = useState(false);

  const classes = useStyles();
  const [allRooms, setAllRooms] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleOpen = e => {
    e.preventDefault();
    setOpen(!open);
  };

  useEffect(() => {
    axios
      .get('/api/v1/rooms')
      .then(function (response) {
        const rooms = [];
        for (let i = 0; i < response.data.length; i += 1) {
          console.log('The Room Data', response.data[i]);
          if (response.data[i].active) {
            rooms.push(<RoomOption room={response.data[i]} key={i} />);
          }
        }
        setAllRooms(rooms);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <button type="submit" onClick={toggleOpen}>
        Create Room
      </button>
      <Modal open={open} onClose={toggleOpen} className={classes.modal}>
        <div className={classes.paper}>
          <CreateNewRoomModal />
        </div>
      </Modal>
      {allRooms}
    </div>
  );
};

export default DashboardPage;
