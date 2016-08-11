import React, { Component } from 'react';
import VideoChat from '../container/Video';
import CodeEditor from '../container/Editor';
// import TextEditor from '../container/TextEditor';
import Github from '../container/Github';

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