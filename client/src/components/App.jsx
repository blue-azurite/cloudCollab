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
          <h2>Video Will be here...</h2>
        </div>
      </div>
    );
  }
}