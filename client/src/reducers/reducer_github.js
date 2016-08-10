import { FETCH_GITHUB_REPOS } from '../actions';

const initialState = {
  collection: []
}

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_GITHUB_REPOS:
      return {
        ...state,
        collection: action.payload
      }
      default:
        return state;
  }
}