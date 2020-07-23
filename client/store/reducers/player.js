import { PLAYER_STATE_UPDATE, PLAYER_READY_UPDATE } from '../action_types/player'

const DEFAULT_STATE = {
  ready: false,
  data: {}
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case PLAYER_STATE_UPDATE:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      }
    case PLAYER_READY_UPDATE:
      return {
        ...state,
        ready: action.payload,
      }
    default:
      return state;
  }
}