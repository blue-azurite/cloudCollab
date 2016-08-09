import { FETCH_TEXT_INPUT } from '../actions';

const initialState = {
  collection: ''
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_TEXT_INPUT:
      return {
        state: state,
        collection: action.payload
      };
      default:
        return state;
  }
}