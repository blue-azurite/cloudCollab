import React, { Component } from 'react';
// import Messages from '../components/Messages';
// import Messagebox from '../components/Messagebox';
import { connect } from 'react-redux';
import io from 'socket.io-client';

class Chatbox extends Component {
  constructor () {
    super()
    this.state = {
      socket: io()
    }
  }

  componentWillMount() {
    this.state.socket.on('connect', function(){
      console.log('Connected on the client-side: chatbox');
    });
  }

  render(){
    return (
      <div>
        <div className="chat_header">Chat</div>
      </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    peerId: state.PeerId.peerId
  }
}

export default connect(mapStateToProps)(Chatbox);




