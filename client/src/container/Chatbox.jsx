import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Messages from '../components/Messages';
import Messagebox from '../components/Messagebox';
import { setSocketRoom } from '../actions';

class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatDisplay: false
    }
  }
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
        this.props.socket.emit('room', room);
        //the "emit(room)" was originall wrap on io.connect, which did not fire consistenly
    }
  }

  toggleChat() {
    this.state.chatDisplay ? this.setState({ chatDisplay: false }) : this.setState({ chatDisplay: true })
  }

  render(){

    return (
      <div>

        <ul className="nav navbar-nav navbar-right" onClick={this.toggleChat.bind(this)}>
          <li id="button_chat">
            <a className="withborder ">
              <i className="glyphicon glyphicon-comment">
                <span className="text">
                  <span>Chat</span>
                </span>
              </i>
            </a>
          </li>
        </ul>

        { this.state.chatDisplay ? <Messages /> : null }


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




