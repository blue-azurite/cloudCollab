import { SET_SOCKET_ROOM } from '../actions';

const initialState = {
  roomId: ''
};

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_SOCKET_ROOM:
      return {
        ...state,
        roomId: action.payload
      };
      default:
        return state;
  }
}