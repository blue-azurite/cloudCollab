import React, { Component } from 'react';
import VideoChat from '../container/Video';
import Github from '../container/Github';
import CodeEditor from '../container/Editor';
import GitCLI from '../container/GitCLI';
import Chatbox from '../container/Chatbox';
import Nav from '../components/Nav';
import Screenshare from '../container/Screenshare';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>

        {/* Navigation */}
        <Nav />
        <div className="container header">
          <div className="page-header" id="banner">
            {/* Start Header */} 
            <div className="row">
              <div className="col-lg-12">
              </div>
            </div>
            {/* End Header */} 
            <br />
            {/* Start Editor && Video Container*/} 
            <div className="row">
              <div className="col-lg-2 overflowControl">
                <Github />
              </div>
              <div className="col-lg-6">
                <br />
                <br />

                <CodeEditor />
              </div>
              <div className="col-lg-4">
                <br />
                <br />
                  <VideoChat />
              </div>
            </div>
            {/* End Editor && Video Container*/} 
            
            {/* Start Console */} 
            <div className="row">
              <div className="col-lg-12">
                { /* <Console /> */ }
              </div>
            </div>
            {/* End Console */} 

            <Screenshare />

            <Chatbox />

          </div>
        </div>


        </div>
      </div>
    );
  }
}