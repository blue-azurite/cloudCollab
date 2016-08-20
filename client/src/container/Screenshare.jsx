import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { params, amIHost, getPeerId, setMyId } from '../actions';
import getScreenMedia from 'getScreenMedia';

class Screenshare extends Component {
  constructor(props) {
    super(props)

    // listen for incoming connections for screen share
      // populate screen once ready

      var webrtc = new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: 'localVideo',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remotesVideos',
        // immediately ask for camera access
        autoRequestMedia: true
      });
      var button = document.getElementById('screenShareButton'),
          setButton = function (bool) {
              button.innerText = bool ? 'share screen' : 'stop sharing';
          };
      if (!webrtc.capabilities.screenSharing) {
          button.disabled = 'disabled';
      }
      webrtc.on('localScreenRemoved', function () {
          setButton(true);
      });

      setButton(true);

      button.click(function () {
          if (webrtc.getLocalScreen()) {
              webrtc.stopScreenShare();
              setButton(true);
          } else {
              webrtc.shareScreen(function (err) {
                  if (err) {
                      setButton(true);
                  } else {
                      setButton(false);
                  }
              });

          }
      });

      webrtc.on('localScreenAdded', function (video) {
          video.onclick = function () {
              video.style.width = video.videoWidth + 'px';
              video.style.height = video.videoHeight + 'px';
          };
          document.getElementById('localScreenContainer').appendChild(video);
          $('#localScreenContainer').show();
      });
      // local screen removed
      webrtc.on('localScreenRemoved', function (video) {
          document.getElementById('localScreenContainer').removeChild(video);
          $('#localScreenContainer').hide();
      });
  }


  handleClick() {
    // start screen share 
    var broadcastId;
    if (this.props.amIHost()) {
      // start screenshare w/ myId broadcast name
      broadcastId = this.props.myId;
    } else {
      // start screenshare w/ peerId broadcast name
      broadcastId = this.props.peerId;
    }
  }


  render() {
    return (
      <div className="col-lg-12 screenshare-container">
        <center>
          <button onClick={this.handleClick.bind(this)} className="btn btn-default">Share your screen</button> {/* TODO: once shared, change this button to disable screen */}<br />
          Plugin required: <a href="https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk" target="blank">screen capturing chrome extension</a>
          <div id="screenshare"></div>
        </center>
      </div>
    )
  }
}



function mapStateToProps(state) {
  // Whatever is returned will show up as props
  return {
    socket: state.Socket.socket,
    isHost: state.Host.isHost,
    peerId: state.PeerId.peerId,
    myId: state.MyId.myId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    amIHost: amIHost, 
    getPeerId: getPeerId, 
    setMyId: setMyId
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Screenshare);