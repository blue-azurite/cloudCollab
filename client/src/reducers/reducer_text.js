import { CHANGE_INPUT } from '../actions';

const initialState = {
  Text: 'Welcome to Cloud Collab! Start by inviting a friend by copying the share link to the right. :)'
};


export default function (state = initialState, action) {
  switch(action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        Text: action.payload
      }
      default:
        return state;
    }
}

