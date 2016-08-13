import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessageEntry extends Component {
  constructor () {
    super()
  }

  render(){
    if(this.props.message.id === this.props.myId){
      return (
        <div className="me chat_message">
          <p>{this.props.message.message}</p>
        </div>
      );
    } else {
      return (
        <div className="collaborator chat_message">
          <p>{this.props.message.message}</p>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    myId: state.MyId.myId 
  }
}

export default connect(mapStateToProps)(MessageEntry);