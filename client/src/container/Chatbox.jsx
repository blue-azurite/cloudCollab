import React, { Component } from 'react';
import Messages from '../components/Messages';
import Messagebox from '../components/Messagebox';
// import { connect } from 'react-redux';
// import io from 'socket.io-client';

export default class Chatbox extends Component {
  render(){
    return (
      <div className="chat_box">
        <div className="chat_header modal-header">Chatbox</div>
        <Messages />
        <Messagebox />
      </div>
      )
  }
}

// function mapStateToProps(state) {
//   return {
//     peerId: state.PeerId.peerId, 
//     socket: state.Socket.socket
//   }
// }

// export default connect(mapStateToProps)(Chatbox);




