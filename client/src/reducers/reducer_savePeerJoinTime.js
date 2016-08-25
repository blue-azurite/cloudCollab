import { SAVE_PEER_JOIN_TIME } from '../actions/index';

const initialState = {
  peerJoinTime: ''
}

export default function( state = initialState, action ) {
  switch(action.type) {
    case SAVE_PEER_JOIN_TIME:
      return {
        ...state,
        peerJoinTime: action.payload
      }
      default:
        return state;
  }
}