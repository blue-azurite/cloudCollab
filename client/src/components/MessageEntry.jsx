import React, { Component } from 'react';
import { connect } from 'react-redux';

// if(this.props.message.id === this.props.myId){
//       return (
//         <div className="me chat_message">
//           <p>{this.props.message.message}</p>
//         </div>
//       );
//     } else {
//       return (
//         <div className="collaborator chat_message">
//           <p>{this.props.message.message}</p>
//         </div>


class MessageEntry extends Component {
  constructor () {
    super()
  }

  render(){
    let avatarUrl = 'https://robohash.org/' + this.props.name;

    if (this.props.message.id === this.props.myId) {
      return (
        <li className="right clearfix infomsg">
          <span className="chat-img">
            <img src={avatarUrl} className="img-circle" />
            <div className="chat-body clearfix">
              <div className="header">
                <span id="date" className="primary-font pull-right"></span>
              </div>

            </div>
          </span>
        </li>


      );
    }
    
  }
}

function mapStateToProps(state) {
  return {
    myId: state.MyId.myId, 
    name: state.Name.name
  }
}

export default connect(mapStateToProps)(MessageEntry);