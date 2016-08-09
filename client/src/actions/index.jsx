import { peer, getMyId, establishPeerConnetion, establishPeerCall, establishPeerConnection } from './VideoActions';

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

navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia );


export function updateText(data) {
  return {
    type: FETCH_TEXT_INPUT,
    payload: data
  };
} 



export function initializeVideo() {
  let id = 0;

  navigator.mediaDevices.getUserMedia(constraints) 
    .then(setUpVideo)
    .catch(console.error.bind(console));
  getMyId( (peerId) => (
    id = peerId
  ));


  return {
      type: INITIALIZE,
      payload: {
        peerId: id
      }
  };
}


function setUpVideo(localStream) {
  const localVideo = document.querySelector('#local-video');
  localVideo.srcObject = localStream;
  console.log('Setting up video.');

  establishPeerCall(localStream, this.props.isHost ? null : this.props.peerId)
    .then((remoteStream) => {
      const remoteVideo = document.querySelector('.remote-video');
      remoteVideo.srcObject = remoteStream;
    })
    .catch(console.error.bind(console)); 
}



export const FETCH_TEXT_INPUT = 'FETCH_TEXT_INPUT';
export const GET_PEER_ID = 'GET_PEER_ID';
export const INITIALIZE = 'INITIALIZE';
export const SET_UP_VIDEO = 'SET_UP_VIDEO';