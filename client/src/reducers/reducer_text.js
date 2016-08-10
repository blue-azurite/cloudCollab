import { FETCH_TEXT_INPUT } from '../actions';

const initialState = {
  userInput: '//start your document here'
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_TEXT_INPUT:
      return {
        ...state,
        userInput: action.payload
      };
      default:
        return state;
  }
}