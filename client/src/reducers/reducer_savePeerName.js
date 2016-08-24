import { SAVE_PEER_NAME } from '../actions/index';

const initialState = {
  peerName: ''
}

export default function( state = initialState, action ) {
  switch(action.type) {
    case SAVE_PEER_NAME:
      return {
        ...state,
        peerName: action.payload
      }
      default:
        return state;
  }
}