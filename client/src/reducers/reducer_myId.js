import { SET_MY_ID } from '../actions';

const initialState = {
  myId: ''
}

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_MY_ID:
      return {
        ...state,
        myId: action.payload
      }
      default:
        return state;
    }
}
