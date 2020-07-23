import { PLAYER_UPDATE } from '../action_types/player'

const DEFAULT_STATE = {
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case PLAYER_UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}