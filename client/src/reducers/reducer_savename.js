import { SAVE_NAME } from '../actions/index';

const initialState = {
  name: ''
}

export default function( state = initialState, action ) {
  switch(action.type) {
    case SAVE_NAME:
      return {
        ...state,
        name: action.payload
      }
      default:
        return state;
  }
}