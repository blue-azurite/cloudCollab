import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageEntry from './MessageEntry';

class Messages extends Component {
  constructor (props) {
    super(props);
    this.state = {
      messages: [] 
    }

    var addMessage = function (msg){
      var messages = this.state.messages.slice();
      messages.push(msg);
      this.setState({messages: messages});
    }.bind(this);

    this.props.socket.on('new message', function(newMessage){
      addMessage(newMessage);
    });
  }

  // componentWillMount() {
  //   this.props.socket.on('connect', function(){
  //     console.log('Connected on the client-side: MessageDisplay');
  //   });
  // }


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
    socket: state.Socket.socket
  }
}

export default connect(mapStateToProps)(Messages);