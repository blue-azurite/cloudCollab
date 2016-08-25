import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessageEntry extends Component {
  constructor () {
    super()
  }

  render(){
    let avatarUrl = 'https://robohash.org/' + this.props.name;
    let peerAvatarUrl = 'https://robohash.org/' + this.props.peerName;

    if (this.props.message.id === this.props.myId) {
      return (
        <li className="right clearfix infomsg">
          <span className="chat-img">
            <img src={avatarUrl} className="img-circle imgLeft" />
            <div className="chat-body clearfix">
              <div className="header">
                <span id="date" className="primary-font pull-right"></span>
              </div>
              <p id="message"> <b> {this.props.name}: </b> {this.props.message.message}</p>
            </div>
          </span>
        </li>
      );
    } else {
      return (
        <li className="left clearfix infomsg">
          <span className="chat-img">
            <img src={peerAvatarUrl} className="img-circle imgRight" />
            <div className="chat-body clearfix">
              <div className="header">
                <span id="date" className="primary-font pull-right"></span>
              </div>
              <p id="message"><b> {this.props.peerName}: </b> {this.props.message.message}</p>
            </div>
          </span>
        </li>
      )
    }
  }
    
}

function mapStateToProps(state) {
  return {
    myId: state.MyId.myId, 
    name: state.Name.name,
    peerName: state.PeerName.peerName
  }
}

export default connect(mapStateToProps)(MessageEntry);