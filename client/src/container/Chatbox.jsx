import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Messages from '../components/Messages';
import Messagebox from '../components/Messagebox';
import { setSocketRoom } from '../actions';

class Chatbox extends Component {
  
  componentDidUpdate(){
    if(this.props.peerId){
    // if client is not-host (peerId exist), set RoomId to "peerId"
      this.props.setSocketRoom(this.props.peerId);
    } else if (this.props.myId){
    // else set RoomId to "myId"
      this.props.setSocketRoom(this.props.myId);
    }
    if(this.props.roomId){
      var room = this.props.roomId;
      this.props.socket.on('connect', function(){
        console.log('client join room:', room);
        this.emit('room', room);
      })
    }
  }

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

function mapStateToProps(state) {
  return {
    myId: state.MyId.myId,
    peerId: state.PeerId.peerId,
    roomId: state.RoomId.roomId,
    socket: state.Socket.socket
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSocketRoom: setSocketRoom
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);




