import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { params, amIHost, getPeerId, setMyId } from '../actions';
import getScreenMedia from 'getScreenMedia';


class Screenshare extends Component {
  constructor(props) {
    super(props);

  }


  handleClick() {
    
    console.log('clicked')
    getScreenMedia(function (err, stream) {
        // if the browser doesn't support user media
        // or the user says "no" the error gets passed
        // as the first argument.
        if (err) {
           console.log('failed');
        } else {
           console.log('got a stream', stream);  
        }
    });


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