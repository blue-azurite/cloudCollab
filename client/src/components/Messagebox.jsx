import React, { Component } from 'react';
import { connect } from 'react-redux';

class Messagebox extends Component {

  sendMessage(e){
    if(e.keyCode === 13){
      var newMessage = {
        id: this.props.myId, 
        message: e.target.value, 
        room: this.props.roomId,
        name: this.props.name
      };
      this.props.socket.emit('new message', newMessage);
      e.target.value = '';
    }
  }

  render(){
    return (
      <div className="panel-footer">
          <div className="input-group">
              <input onKeyDown={this.sendMessage.bind(this)} id="btn-input" type="text" className="mousetrap form-control input-sm" placeholder="Type your message here..." />
              <span className="input-group-btn">
                  <button id="button_send" className="btn btn-primary btn-sm" onKeyDown={this.sendMessage.bind(this)} >Send</button>
              </span>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myId: state.MyId.myId, 
    socket: state.Socket.socket, 
    peerId: state.PeerId.peerId,
    roomId: state.RoomId.roomId,
    name: state.Name.name
  }
}

export default connect(mapStateToProps)(Messagebox);