import { GET_PEER_ID } from '../actions';

const initialState = {
  peerId: ''
};


export default function (state = initialState, action) {
  switch(action.type) {
    case GET_PEER_ID:
      return {
        ...state,
        peerId: action.payload
      }
      default:
        return state;
    }
}
