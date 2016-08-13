import React, { Component } from 'react';
import { connect } from 'react-redux';

class Messagebox extends Component {
  constructor () {
    super()
  }

  componentWillMount() {
    this.props.socket.on('connect', function(){
      console.log('Connected on the client-side: MessageBox');
    });
  }

  render(){
    return (
      <div className="messages_box">
       <input ref="new_message" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    peerId: state.PeerId.peerId, 
    socket: state.Socket.socket
  }
}

export default connect(mapStateToProps)(Messagebox);