import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/monokai';
import 'brace/mode/javascript';
import axios from 'axios';
//actions
import { params, updateText, amIHost, getPeerId } from '../actions'

const initialValue = `//Start Code Here`

class CodeEditor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			input: initialValue
		};
	}

	componentDidMount () {

		$('#editor').codeblock({
	    editable: true,
	    //initial console text
	    consoleText: "> Your output shows here",
	    consoleClass: "codeblock-console-text",
	    runButtonText: "run",
	    runButtonClass: "codeblock-console-run, btn, btn-primary, btn-xs",
	    console: true,
	    resetable: false,
	    runnable: true,
	    //The ace theme to use
	    editorTheme: "ace/theme/monokai",
	    lineNumbers: true
  	}); 

		// editor view
		const editor = ace.edit("editor"); 
		editor.setValue(this.state.input);

		var changeState = function(obj){
			this.setState(obj);
		}.bind(this);
		
		var newGuestUpdate = function(text){
			if(this.props.peerId === null){
				this.change(text);
			}
		}.bind(this);
		
		this.props.socket.on('change text', function(text){
			changeState({input: text});
			editor.setValue(text);
		});

		this.props.socket.on('new guest', function(){
			newGuestUpdate(editor.getValue());						
		});

		$('.codeblock-editor-wrapper').css('height', '500px') // shim for getting rid of the lower margin of ace editor & codeblock
		editor.$blockScrolling = Infinity

	}

	componentWillUpdate() {
		// on update - this is showing up correctly
		this.props.updateText(this.state.input);
	}
	
	change(text) {
		var textToRoom = {
			text: text, 
			room: this.props.roomId
		};
		this.props.socket.emit('change text', textToRoom);
	}

	render() {
		return (
			<div>
				<AceEditor
					width="100%"
					height="500px"
					mode="javascript"
					name="ghosteditor"
					theme="monokai"
					value={this.props.input}
					onChange={this.change.bind(this)}
				  value={this.state.input}
				/>
			
				<AceEditor
					width="100%"
					mode="javascript"
					theme="monokai"
					name="editor"
				/>
	
			</div>
		);
	}
}

// TODO: Either delete or make available
function mapStateToProps(state) {
  return {
    socket: state.Socket.socket,
    input: state.Text.text,
    peerId: state.PeerId.peerId,
    myId: state.MyId.myId,
    roomId: state.RoomId.roomId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateText: updateText, amIHost: amIHost, getPeerId: getPeerId }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);

