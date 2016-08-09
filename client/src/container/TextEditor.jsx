import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FETCH_TEXT_INPUT } from '../actions';
import { updateText } from '../actions';

class TextEditor extends Component {
  handleChange(event){
    this.props.updateText(event.target.value);
  }
  render() {
    return (
      <div>
        <textarea onChange={this.handleChange.bind(this)} value={this.props.textBox}></textarea>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    textBox: state.Text.userInput
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateText: updateText }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);