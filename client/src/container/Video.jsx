import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../components/Link';
// import any other actions as well
import { initVidAsHost, amIHost, getPeerId, getLink } from '../actions';
import { peer, peerId, establishPeerConnetion, establishPeerCall, establishPeerConnection } from '../utilities/VideoActions';

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

class VideoChat extends Component {

  componentDidMount() {

    // let's initialize.

    // check if host or receiver!
    if (this.props.amIHost()) {
      // if host...initAsHost
      console.log('yeeeee you are host')
    } else {
      // if receiver...initAsReceiver
    }
  }

  enableVideo() {
    this.props.initVidAsHost();
    this.renderLink();
  }

  initAsSource() {
    establishPeerConnection().then( (conn) => {
      // Now connected to receiver as source
      console.log('now connected to a peer')
    })
  }

  initAsReceiver(peerId) {
    establishPeerConnection(peerId).then( (conn) => {
      // Now connected to source as receiver
      console.log('now connected to source')
    })
  }

  setUpLocalVideo(localStream) {
  const localVideo = document.querySelector('#local-video');
  localVideo.srcObject = localStream;
  console.log('Setting up video.');

  establishPeerCall(localStream, this.props.amIHost() ? null : this.props.peerId)
    .then((remoteStream) => {
      const remoteVideo = document.querySelector('#remote-video');
      remoteVideo.srcObject = remoteStream;
    })
    .catch(console.log('error')); 
  }

  renderLink() {
    console.log(this.props.myId)
  }

  render() {
    return(
      <div id="video" className="mediaDiv"> 
        <button onClick={this.renderLink.bind(this)}>Invite a friend</button>
        <button onClick={this.enableVideo.bind(this)}>Enable video chat</button>
        <video id="local-video" autoPlay></video>
        <video id="remote-video" autoPlay></video>
      </div>
    )
  }

}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  return {
    myId: null,
    isHost: true,
    localStream: null, 
    showLink: true,
    peerId: null
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initVidAsHost: initVidAsHost, amIHost: amIHost, getPeerId: getPeerId, getLink: getLink }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);