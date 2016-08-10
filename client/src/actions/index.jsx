import { peer, establishPeerConnetion, establishPeerCall, establishPeerConnection } from '../utilities/VideoActions';

const params = new URLSearchParams(location.search.slice(1));

const constraints = {
  audio: true,
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


export function initVidAsHost() {

  navigator.mediaDevices.getUserMedia(constraints) 
    .then(setUpLocalVideo)
    .catch(console.error.bind(console));

  return {
      type: INIT_VID_AS_HOST,
      payload: peerId
  };
}

export function setUpLocalVideo(localStream) {
  const localVideo = document.querySelector('#local-video');
  localVideo.srcObject = localStream;
  console.log('Setting up video.');

  // establishPeerCall(localStream, this.props.isHost ? null : this.props.peerId)
  //   .then((remoteStream) => {
  //     const remoteVideo = document.querySelector('.remote-video');
  //     remoteVideo.srcObject = remoteStream;
  //   })
  //   .catch(console.error.bind(console)); 
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


export function getLink() {
  return {
    type: FETCH_LINK
  }
}

export const FETCH_TEXT_INPUT = 'FETCH_TEXT_INPUT';
export const GET_PEER_ID = 'GET_PEER_ID';
export const INIT_VID_AS_HOST = 'INIT_VID_AS_HOST';
export const SET_UP_VIDEO = 'SET_UP_VIDEO';
export const CHECK_IF_HOST = 'CHECK_IF_HOST';