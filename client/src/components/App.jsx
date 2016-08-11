import React, { Component } from 'react';
import VideoChat from '../container/Video';
import Github from '../container/Github';
import CodeEditor from '../container/Editor'

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <CodeEditor />
        </div>
        <div>
          <Github />
        </div>
        <div>
          <VideoChat />
        </div>
      </div>
    );
  }
}