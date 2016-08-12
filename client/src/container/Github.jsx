import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRepos } from '../actions';
import axios from 'axios';

class Github extends Component {
  render(){
    return (
      <div>
        <a href="/api/github">Login with GitHub</a>
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