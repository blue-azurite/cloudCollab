import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import keydown from 'react-keydown';
// import any other actions as well ^___^ 

class GitCLI extends Component {
 handleKeyPress(e) {
  if (e.key === 'Enter') {
    console.log('Enter keypress detected')
  }
 }


  render() {
    return(
      <textarea defaultValue="git" onKeyPress={this.handleKeyPress.bind(this)}></textarea>
    )
  }
}


function mapStateToProps(state) {
  // Whatever is returned will show up as props
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GitCLI);
