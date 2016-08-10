import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../components/Link';
// import any other actions as well
import { params, initVid, amIHost, getPeerId, getLink, showLink, setMyId } from '../actions';
import { getMyId, peer, peerId, establishPeerCall, establishPeerConnection } from '../utilities/VideoActions';


class VideoChat extends Component {

  componentDidMount() {
    const sourceId = params.get('id');

    if (this.props.amIHost().payload) {
      this.initAsSource()
    } else {
      this.initAsReceiver(sourceId)
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
    this.renderLink();

    // if host...initAsHost
    if (this.props.amIHost().payload) {
      this.props.initVid();
    } else {
      // if receiver...initAsReceiver
      console.log('trying to enable video as receiver...', this.props.peerId);
      this.props.initVid(this.props.peerId)
    }
  }

  renderLink() {
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