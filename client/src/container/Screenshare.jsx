import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { params, amIHost, getPeerId, setMyId } from '../actions';

class Screenshare extends Component {
  constructor(props) {
    super(props)

    // listen for incoming connections for screen share
      // populate screen once ready
  }

  handleClick() {
    // start screen share 

    if (this.props.amIHost()) {
      // start screenshare w/ myId broadcast name
    } else {
      // start screenshare w/ peerId broadcast name
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