import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../components/Link';
// import any other actions as well
import { initVidAsHost, amIHost, getPeerId, getLink, showLink, setMyId } from '../actions';
import { getMyId, peer, peerId, establishPeerCall, establishPeerConnection } from '../utilities/VideoActions';

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
    this.props.getPeerId();
  }

  componentWillMount() {    
    getMyId().then((id) => {
      this.props.setMyId(id)
      console.log('id is:', id)
    }).catch((err) => console.error(err))
  }

  enableVideo() {
    this.renderLink();

    // if host...initAsHost
    if (this.props.amIHost()) {
      this.props.initVidAsHost();
    } else {
      // if receiver...initAsReceiver
      this.props.initVidAsHost(this.props.myId)
    }
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
    console.log(this.props)
    this.props.showLink(this.props.link);
  }

  render() {
    return(
      <div id="video" className="mediaDiv"> 
        {console.log('my id is:', this.props.myId)}
        { this.props.link ? <Link myId={this.props.myId} /> : null }
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
    isHost: true,
    localStream: null, 
    link: state.Link.link ,
    peerId: state.PeerId.peerId,
    myId: state.MyId.myId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    initVidAsHost: initVidAsHost, 
    amIHost: amIHost, 
    getPeerId: getPeerId, 
    getLink: getLink,
    showLink: showLink,
    setMyId: setMyId
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);