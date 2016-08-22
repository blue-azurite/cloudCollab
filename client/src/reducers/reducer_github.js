import { FETCH_USER_GITHUB, FETCH_USER_GITHUB_REPOS, FETCH_USER_GITHUB_REPO_CONTENTS, FETCH_USER_GITHUB_REPO_TREE } from '../actions';

const initialState = {
  trees: [],
  repos: [],
  contents: [],
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
        repos: action.payload
      }
    case FETCH_USER_GITHUB_REPO_CONTENTS:
      return {
        ...state,
        contents: action.payload
      }
    case FETCH_USER_GITHUB_REPO_TREE:
      return {
        ...state,
        trees: action.payload
      }
    default:
      return state;
  }
}