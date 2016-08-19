import { peerId, peer, establishPeerConnetion, establishPeerCall, establishPeerConnection } from '../utilities/VideoActions';
import axios from 'axios';

export const params = new URLSearchParams(location.search.slice(1));

// constraints for video
const constraints = {
  audio: false, // setting to false for testing purposes
  video: {
    width: {
      min: 250,
      max: 250
    }, 
    height: {
      min: 189,
      max: 190
    }
  }
};

////************************ Text editor ************************////
export function createSocket(data) {
  return {
    type: SOCKET_IO,
    payload: data
  };
} 

export function updateText(text) {
  return {
    type: CHANGE_INPUT,
    payload: text
  }
}

export function setSocketRoom(roomId) {
  return {
    type: SET_SOCKET_ROOM,
    payload: roomId
  };
} 

////************************ PEERJS COMMUNICATION ************************////
export function initVid(id) {

  navigator.mediaDevices.getUserMedia(constraints) 
    .then((stream) => {
      setUpLocalVideo(stream, id)
    })
    .catch(console.error.bind(console));

  return {
      type: INIT_VID,
      payload: peerId
  };
}

function setUpLocalVideo(localStream, id) {
  const localVideo = document.querySelector('#local-video');
  localVideo.srcObject = localStream;

  // after setting up local video

  // can we set up remote without passing in localstream??

  // bug: if source peer does not enable video but remote peer does, 
  // when source peer enables video it will not render remote peer's video
  // on remote peer's end, source peer's video will not render either.
  // it involves another 'enable video' click on both ends for both videos to render. 

  establishPeerCall(localStream, id)
    .then((remoteStream) => {
      const remoteVideo = document.querySelector('#remote-video');
      remoteVideo.srcObject = remoteStream; 
    })
    .catch(console.error.bind(console)); 
}


export function amIHost() {
  const isHost = !params.has('id');
  return {
    type: CHECK_IF_HOST,
    payload: isHost
  }
}

export function getPeerId() {
  return {
    type: GET_PEER_ID,
    payload: params.get('id')
  }
}

export function setMyId(myId) {
  return {
    type: SET_MY_ID,
    payload: myId
  }
}


////************************ Github API ************************////

// Sign in user
export function fetchUser() {
  const user = axios.get('api/github');
  return {
    type: FETCH_USER_GITHUB,
    payload: user
  }
}

////************************ Github API ************************////

// If user is signed in, fetch list of repos
export function fetchUserRepos() {
  const userRepos = axios.get('api/github/repos')
    .then(response => {
      return response.data;
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      console.warn(error);
    });
  return {
    type: FETCH_USER_GITHUB_REPOS,
    payload: userRepos
  }
}

// If user is signed in, fetch list of repos
export function fetchSha(userRepo) {
  const data = {
    repo: userRepo
  }
  const userSha = axios.post('/api/github/repo/sha',data)
    .then(response => {
      return response.data;
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      console.warn(error);
    });
  return {
    type: FETCH_USER_GITHUB_REPO_CONTENTS,
    payload: userSha
  }
}

export const SOCKET_IO = 'SOCKET_IO';
export const CHANGE_INPUT = 'CHANGE_INPUT';
export const SET_SOCKET_ROOM = 'SET_SOCKET_ROOM';
export const GET_PEER_ID = 'GET_PEER_ID';
export const INIT_VID = 'INIT_VID';
export const SET_UP_VIDEO = 'SET_UP_VIDEO';
export const CHECK_IF_HOST = 'CHECK_IF_HOST';
export const SET_MY_ID = 'SET_MY_ID';
export const FETCH_USER_GITHUB = 'FETCH_USER_GITHUB';
export const FETCH_USER_GITHUB_REPOS = 'FETCH_USER_GITHUB_REPOS';
export const FETCH_USER_GITHUB_REPO_CONTENTS = 'FETCH_USER_GITHUB_REPO_CONTENTS';
