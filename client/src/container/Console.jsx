import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(), 
      output: ''
    }

    var changeState = function(obj){
      console.log('state is changing!', obj)
      console.log('new state is:', this.state.output)
      this.setState(obj);
    }.bind(this);
    
    this.state.socket.on('output', function(output){
      changeState({output: output});

    });

  }


  render() {
    return(
      <div id="console">
      > {this.state.output}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Console);
