import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessageEntry extends Component {
  constructor () {
    super()
  }

  render(){
    if(this.props.message.id === this.props.myId){
      return (
        <p className="me">
          {this.props.message.message}
        </p>
      );
    } else {
      return (
        <p className="collaborator">
            {this.props.message.message}
        </p>
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