import { SOCKET_IO } from '../actions';
import io from 'socket.io-client';

const initialState = {
  socket: io()
};

export default function (state = initialState, action) {
  switch(action.type) {
    case SOCKET_IO:
      return {
        ...state,
        socket: action.payload
      };
      default:
        return state;
  }
}