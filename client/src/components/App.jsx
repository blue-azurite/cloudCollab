import React, { Component } from 'react';
import Github from '../container/Github';
import CodeEditor from '../container/Editor';
import Chatbox from '../container/Chatbox';
import Nav from './Nav';
import Modal from '../container/Modal';
import BurgerMenu from 'react-burger-menu';

const Menu = require('react-burger-menu').stack;

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
        <Modal />
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

            {/* Start main row */} 
            <Github />
            <div className="row main">
              <div className="col-lg-12">
                <br />
                <br />

                <CodeEditor />
              </div>
            </div>
            {/* End main row */} 

            
            {/* Start Chat */} 
            <div className="row">
              <div className="col-lg-12">
                <Chatbox />
              </div>
            </div>
            {/* End Chat */} 

          </div>
        </div>


        </div>
      </div>
    );
  }
}