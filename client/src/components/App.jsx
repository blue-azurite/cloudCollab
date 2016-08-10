import React, { Component } from 'react';
import VideoChat from '../container/Video';
import CodeEditor from './Editor'

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <CodeEditor />
        </div>
        <div>
          <VideoChat />
        </div>
      </div>
    );
  }
}