import { peerId, peer, establishPeerConnetion, establishPeerCall, establishPeerConnection } from '../utilities/VideoActions';

export const params = new URLSearchParams(location.search.slice(1));

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


export function updateText(data) {
  return {
    type: FETCH_TEXT_INPUT,
    payload: data
  };
} 


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
  console.log('Setting up video.');

  establishPeerCall(localStream, id)
    .then((remoteStream) => {
      const remoteVideo = document.querySelector('.remote-video');
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


export function showLink(boolean) {

  if (boolean === true) {
    boolean = false;
  } else {
    boolean = true;
  }

  return {
    type: CHANGE_LINK_STATE,
    payload: boolean
  }
}


export const FETCH_TEXT_INPUT = 'FETCH_TEXT_INPUT';
export const GET_PEER_ID = 'GET_PEER_ID';
export const INIT_VID = 'INIT_VID';
export const SET_UP_VIDEO = 'SET_UP_VIDEO';
export const CHECK_IF_HOST = 'CHECK_IF_HOST';
export const CHANGE_LINK_STATE = 'CHANGE_LINK_STATE';
export const SET_MY_ID = 'SET_MY_ID';
