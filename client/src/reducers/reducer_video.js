import { INIT_VID } from '../actions';

const initialState = {
  myId: ''
};


export default function (state = initialState, action) {
  switch(action.type) {
    case INIT_VID:
      return {
        ...state,
        myId: action.payload
      }
      default:
        return state;
    }
}

