import { FETCH_USER_GITHUB } from '../actions';

const initialState = {
  collection: []
}

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_USER_GITHUB:
      return {
        ...state,
        collection: action.payload
      }
      default:
        return state;
  }
}