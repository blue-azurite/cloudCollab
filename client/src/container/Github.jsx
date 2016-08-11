import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRepos } from '../actions';

class Github extends Component {
  handleClick() {
    console.log('hello click');
  }
  render(){
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}></button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    Repos: state.Repos.collection
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRepos: fetchRepos },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Github);