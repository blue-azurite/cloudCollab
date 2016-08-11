import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import any other actions as well ^___^ 

class GitCLI extends Component {

  submit() {
    console.log('haiii there ^_____^')
  }

  render() {
    return(
      <textarea defaultValue="hello" onEnter={this.submit.bind(this)}></textarea>
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
