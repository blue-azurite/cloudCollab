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

  sendMessage(e){
    if(e.keyCode == 13){
      var newMessage = {
        id: this.props.myId, 
        message: e.target.value
      };
      this.props.socket.emit('new message', newMessage);
      e.target.value = '';
    }
  }

  render(){
    return (
      <div className="messages_box">
       <input type='text' onKeyDown={this.sendMessage.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myId: state.MyId.myId, 
    socket: state.Socket.socket
  }
}

export default connect(mapStateToProps)(Messagebox);