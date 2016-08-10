import React, { Component } from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/theme/github';
import 'brace/mode/javascript';

export default class CodeEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
	}

	change() {

	}

	render() {
		return (
			<div>
				<AceEditor
					width="100%"
					mode="javascript"
					theme="github"
					value={this.state.text}
					onChange={this.change.bind(this)}
				/>
			</div>
		);
	}
}

export { CodeEditor };
