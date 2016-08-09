import React, { Component } from 'react';
import TextEditor from '../container/TextEditor';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <TextEditor />
        </div>
        <div>
          <Video />
        </div>
      </div>
    );
  }
}