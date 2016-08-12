import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(), 
      output: 'Output will show up hurr'
    }

    var changeState = function(obj){
      this.setState(obj);
    }.bind(this);
    
    this.state.socket.on('run code', function(text){
      changeState({input: text});
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
