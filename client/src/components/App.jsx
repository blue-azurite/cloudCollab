import React, { Component } from 'react';
import VideoChat from '../container/Video';
import Github from '../container/Github';
import CodeEditor from '../container/Editor'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 className="header">CloudCollab</h1>
        <div>
          <div className="app">
            <CodeEditor />
            <VideoChat />
            <Github />
          </div>
        </div>
      </div>
    );
  }
}