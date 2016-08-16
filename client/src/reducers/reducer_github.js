import { FETCH_USER_GITHUB, FETCH_USER_GITHUB_REPOS } from '../actions';

const initialState = {
  collection: [],
  username: ''
}

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_USER_GITHUB:
      return {
        ...state,
        username: action.payload
      }
    case FETCH_USER_GITHUB_REPOS:
      return {
        ...state,
        collection: action.payload
      }
    default:
      return state;
  }
}