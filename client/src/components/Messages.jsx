import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageEntry from './MessageEntry';

class Messages extends Component {
  constructor () {
    super();
    this.state = {
      messages: [
        {name: 'Yuyi', message: 'Hello, there'}, 
        {name: 'Melanie', message: 'Hi Dad'}
      ] 
    }
  }

  componentWillMount() {
    this.props.socket.on('connect', function(){
      console.log('Connected on the client-side: MessageDisplay');
    });
  }

  render(){
    return (
      <div className="messages_display">
        {this.state.messages.map((message, index) => 
          <MessageEntry key={index} message={message} />
        )}
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

export default connect(mapStateToProps)(Messages);