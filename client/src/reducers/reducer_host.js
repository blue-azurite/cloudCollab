import { CHECK_IF_HOST } from '../actions/index';

export default function( state = null, action ) {
  switch(action.type) {
    case CHECK_IF_HOST:
      return {
        ...state,
        isHost: action.payload
      }
      default:
        return state;
  }
}