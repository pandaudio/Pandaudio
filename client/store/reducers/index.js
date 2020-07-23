import { combineReducers } from 'redux';
import playerReducer from './player'
import songQueueReducer from './songQueue'

export default combineReducers({
  player: playerReducer,
  songQueue: songQueueReducer
});