import React, { Component } from 'react';
import Messages from '../components/Messages';
import Messagebox from '../components/Messagebox';
import { connect } from 'react-redux';
// import io from 'socket.io-client';

class Chatbox extends Component {
  constructor () {
    super()
    this.state = {
      messages: [
        {name: 'Yuyi', message: 'Hello, there'}, 
        {name: 'Melanie', message: 'Hi Dad'}
      ] 
    }
  }

  componentWillMount() {
    this.props.socket.on('connect', function(){
      console.log('Connected on the client-side: chatbox');
    });
  }

  updateMessage() {

  }

  render(){
    return (
      <div>
        <div className="chat_header">Chatbox</div>
        <Messages messages={this.state.messages}/>
        <Messagebox socket={this.props.socket} />
      </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    peerId: state.PeerId.peerId, 
    socket: state.Socket.socket
  }
}

export default connect(mapStateToProps)(Chatbox);




