import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import any other actions as well
import { initializeVideo, getPeerId } from '../actions';

class VideoChat extends Component {

  componentDidMount() {
  }

  render() {
    return(
      <div id="video" className="mediaDiv">
        <button onClick={() => this.props.initializeVideo()}>Enable video chat</button>
        <video id="local-video" autoPlay></video>
      </div>
    )
  }

}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  return {
    peerId: null,
    isHost: true,
    localStream: null
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeVideo: initializeVideo, getPeerId: getPeerId }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);