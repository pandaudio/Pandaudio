import { PLAYER_INITIALIZE } from '../action_types/player'

const DEFAULT_STATE = {
  player: null
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case PLAYER_INITIALIZE:
      return {
        ...state,
        player: action.payload
      }
    default:
      return state;
  }
}