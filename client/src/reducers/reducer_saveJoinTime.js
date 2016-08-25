import { SAVE_JOIN_TIME } from '../actions/index';

const initialState = {
  joinTime: ''
}

export default function( state = initialState, action ) {
  switch(action.type) {
    case SAVE_JOIN_TIME:
      return {
        ...state,
        joinTime: action.payload
      }
      default:
        return state;
  }
}