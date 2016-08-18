import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../components/Link';
// import any other actions as well
import { params, initVid, amIHost, getPeerId, setMyId } from '../actions';
import { getMyId, peer, peerId, establishPeerCall, establishPeerConnection } from '../utilities/VideoActions';


class VideoChat extends Component {

  componentWillMount() {    
    this.props.getPeerId(); 

    getMyId().then((id) => {
      this.props.setMyId(id)
    }).catch((err) => console.error(err))
  }

  componentDidMount() {
    const sourceId = params.get('id');
    
    this.props.amIHost(); // this will update global state
        
    if (this.props.isHost) { // this is grabbing global state
      this.initAsSource();
    } else {
      this.initAsReceiver(sourceId);
    }
      
  }

  componentWillMount() {    
    this.props.getPeerId(); 

    getMyId().then((id) => {
      this.props.setMyId(id)
    }).catch((err) => console.error(err))
    
  }

  initAsSource() {
      establishPeerConnection().then( conn => console.log('Peer connection: connected as host!', conn));
  }

  initAsReceiver(sourceId) {
      establishPeerConnection(sourceId).then( conn => console.log('Peer connection: connected to host! ᕙ༼ຈل͜ຈ༽ᕗ ', conn));

  }

  enableVideo() {

    // if host...initAsHost
    if (this.props.isHost) {
      this.props.initVid();
    } else {
      // if receiver...initAsReceiver
      this.props.initVid(this.props.peerId)
    }
  }


  render() {

    return(
      <div id="video" className="mediaDiv"> 
        <Link myId={this.props.myId} /><button className="btn btn-primary btn-sm vid-btn" onClick={this.enableVideo.bind(this)}>Enable video chat</button>
        <video id="local-video" autoPlay></video>
        <video id="remote-video" autoPlay></video>
      </div>
    )
  }

}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  return {
    isHost: state.Host.isHost,
    localStream: null, 
    peerId: state.PeerId.peerId,
    myId: state.MyId.myId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    initVid: initVid, 
    amIHost: amIHost, 
    getPeerId: getPeerId, 
    setMyId: setMyId
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);