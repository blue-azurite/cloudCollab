import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FETCH_TEXT_INPUT } from '../actions';
import { updateText } from '../actions';
import io from 'socket.io-client'
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/github';
import 'brace/mode/javascript';

export default class CodeEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: io(), 
			input: ''
		}

		var changeState = function(obj){
			this.setState(obj);
		}.bind(this);
		
		// Listener for the "server event"
		this.state.socket.on('change text', function(text){
			changeState({input: text});
		});
	}

	componentWillMount() {
		this.state.socket.on('connect', function(){
			console.log('Connected on the client-side');
		});
	}
	
	change(text) {
		// Emit on change event with the text
		this.state.socket.emit('change text', text);
	}

	render() {
		return (
			<div>
				<AceEditor
					width="45%"
					mode="javascript"
					theme="github"
					value={this.state.input}
					onChange={this.change.bind(this)}
				/>
			</div>
		);
	}
}

// TODO: Either delete or make available
// function mapStateToProps(state) {
//   return {
//     textBox: state.Text.userInput
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ updateText: updateText }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);

