import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/github';
import 'brace/mode/javascript';
//actions
import { updateText, amIHost, getPeerId } from '../actions'

const initialValue = `function helloWorld() {
	return 'Hello, world!';
}

console.log(helloWorld())`

class CodeEditor extends Component {
	componentDidMount () {

		$('#editor').codeblock({
	    editable: true,
	    //initial console text
	    consoleText: "> Your output shows here",
	    consoleClass: "codeblock-console-text",
	    runButtonText: "run",
	    runButtonClass: "codeblock-console-run, btn, btn-primary, btn-xs",
	    console: true,
	    resetable: true,
	    runnable: true,
	    //The ace theme to use
	    editorTheme: "ace/theme/github",
	    lineNumbers: true
  	}); 
		const editor = ace.edit("editor")
		editor.setValue(initialValue);
	}
	
	change(text) {
		// Emit on change event with the text
		this.props.socket.emit('change text', text);
		this.props.updateText(text)
	}

	render() {
		return (
			<div>
				<AceEditor
					width="100%"
					mode="javascript"
					theme="github"
					name="editor"
					onChange={this.change.bind(this)}
				  onLoad={(editor) => {
				    editor.setValue(' ');
				  }}
				/>
				{/* <button className="btn btn-primary run-code" onClick={this.handleClick.bind(this)}>Run da code</button> */ }
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
    output: state.Output.Output
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateText: updateText, amIHost: amIHost, getPeerId: getPeerId }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);

