import React, { Component } from 'react';
import { connect } from 'react-redux';

class Messagebox extends Component {
  constructor () {
    super()
  }

  componentDidMount() {
    this.props.socket.on('connect', function(){
      console.log('Connected on the client-side: MessageBox');

    });
  }

  sendMessage(e){
    if(e.keyCode === 13){
      var newMessage = {
        id: this.props.myId, 
        message: e.target.value, 
        room: this.props.roomId
      };
      this.props.socket.emit('new message', newMessage);
      e.target.value = '';
    }
  }

  render(){

    return (
      <div className="messages_box">
       <textarea type='text' placeholder="new message here" onKeyDown={this.sendMessage.bind(this)}></textarea>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myId: state.MyId.myId, 
    socket: state.Socket.socket, 
    peerId: state.PeerId.peerId,
    roomId: state.RoomId.roomId
  }
}

export default connect(mapStateToProps)(Messagebox);