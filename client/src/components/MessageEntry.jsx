import React, { Component } from 'react';

export default class MessageEntry extends Component {
  constructor () {
    super()
  }

  render(){
    //if userName is client, render class "self"
    //else, render class "other"
    return (
      <div>
        <p>
          <span>{this.props.message.name}</span>
          : 
          {this.props.message.message}
        </p>
      </div>
    );
  }
}