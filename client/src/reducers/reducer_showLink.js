import { CHANGE_LINK_STATE } from '../actions';


export default function (state = false, action) {
  switch(action.type) {
    case CHANGE_LINK_STATE:
      return {
        ...state,
        link: action.payload
      }
      default:
        return state;
    }
}

