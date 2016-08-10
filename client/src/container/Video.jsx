import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../components/Link';
// import any other actions as well
import { initVid, amIHost, getPeerId, getLink, showLink, setMyId } from '../actions';
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
      this.props.initVid();
    } else {
      // if receiver...initAsReceiver
      this.props.initVid(this.props.peerId)
    }
  }

  renderLink() {
    console.log(this.props)
    this.props.showLink(this.props.link);
  }

  render() {
    return(
      <div id="video" className="mediaDiv"> 
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
    initVid: initVid, 
    amIHost: amIHost, 
    getPeerId: getPeerId, 
    getLink: getLink,
    showLink: showLink,
    setMyId: setMyId
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);