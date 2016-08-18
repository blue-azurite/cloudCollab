import { FETCH_USER_GITHUB, FETCH_USER_GITHUB_REPOS, FETCH_USER_GITHUB_REPO_CONTENTS } from '../actions';

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
    case FETCH_USER_GITHUB_REPO_CONTENTS:
      return {
        ...state,
        collection: action.payload
      }
    default:
      return state;
  }
}