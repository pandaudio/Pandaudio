import { SONG_QUEUE_UPDATE, SONG_QUEUE_ADD } from '../action_types/songQueue'

const DEFAULT_STATE = {
  data: [],
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case SONG_QUEUE_UPDATE:
      return {
        ...state,
        data: [
          ...state.data,
          ...action.payload,
        ],
      }
    case SONG_QUEUE_ADD:
      return {
        ...state,
        data: [
          ...state.data,
          action.payload,
        ],
      }
    default:
      return state;
  }
}
