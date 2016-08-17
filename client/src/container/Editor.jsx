import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/github';
import 'brace/mode/javascript';
import axios from 'axios';
//actions
import { updateText, amIHost, getPeerId, evalCode } from '../actions'

class CodeEditor extends Component {
	constructor(props) {
		super(props);
		// this.state = { 
		// 	input: ''
		// }

		// var changeState = function(obj){
		// 	this.setState(obj);
		// }.bind(this);
		
		// Listener for the "server event"
		// this.props.socket.on('change text', function(text){
		// 	// changeState({input: text}); //refactor w/ actions
		// 	this.props.updateText(text);	
		// });

	}

	componentWillMount() {
		// this.props.getPeerId(); // updates peerId if not host
		// this.props.socket.on('connect', function(socket) {
		// 	console.log('socket is', socket)
		// 	this.props.socket.to('poop').emit('join')
		// })

		// cannot read property socket of undefined !?!?!

		// // if host - check with amIHost
		// if (this.props.amIHost()) {
		// 	// create room w/ myId
		// 	this.props.socket.join(this.props.myId)
		// } else {
		// 	// join room peerId
		// 	this.props.socket.join(this.props.peerId)
		// 	// get global state input and render that shit
		// }
		// this.props.socket.on('connect', function(){
		// 	console.log('Connected on the client-side: editor');
		// });
	}

	componentDidMount () {
		// this.props.socket.on('change text', function(text){
		// 	// changeState({input: text}); //refactor w/ actions
		// 	console.log(text)
		// 	this.props.updateText(text);	// cannot read property 'updateText' of undefined
		// });
	}
	
	change(text) {
		// Emit on change event with the text
		this.props.socket.emit('change text', text);
		this.props.updateText(text)

	}

	handleClick() {
		// what if rather than emitting the text for backend, we eval the code and set it as global state? 
		// this.props.evalCode(this.props.input);
		// eval(this.props.input)
		// this.props.socket.emit('run code', this.props.input) 
		axios({
			method: 'POST',
			url: '/evalcode',
			data: {
				input: this.props.input
			}
		})
	}

	render() {
		return (
			<div>
				<AceEditor
					width="100%"
					mode="javascript"
					theme="github"
					value={this.props.input}
					onChange={this.change.bind(this)}
				/>
				<button className="btn btn-primary run-code" onClick={this.handleClick.bind(this)}>Run da code</button>
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
  return bindActionCreators({ updateText: updateText, amIHost: amIHost, getPeerId: getPeerId, evalCode: evalCode }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);

