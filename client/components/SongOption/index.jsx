import React from 'react';
import PropTypes from 'prop-types';

const SongOption = props => {

  // const { songName, artist, songResults, setSongResults } = props; *****
  const { songResults, setSongResults } = props;
  const { nameOfSong, nameOfArtist } = songResults; // ******** 

  function handleClick(e) {
    e.preventDefault();
    // Functionality to add song 

  }

  useEffect(() => {
    const songs = [];
    for (let i = 0; i < songResults.length; i += 1) {
      // songs.push(<RoomOption songs={songResults[i]} key={i} />);
      // songs.push(<li key={i} >{nameOfSong[i]}</li>);
      songs.push(<li key={i} >{songResults.nameOfSong[i]}</li>);
    }
    setSongResults(songs);
  }, []);

  return (
    <div>
      <button type="submit" onClick={handleClick}>
        Add Song to Queue
      </button>
      <p>{songName}</p>
      <p>{artist}</p>
    </div>
  );
};

SongOption.defaultProps = {
  artist: '-',
};

SongOption.propTypes = {
  songName: PropTypes.string.isRequired,
  artist: PropTypes.string,
};

export default SongOption;
