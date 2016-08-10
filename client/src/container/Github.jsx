import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action } from '../actions';

class Github extends Component {
  render(){
    return (
      <div>
        { this.props.Repos.map((repo) => {
          <Repository name={repo}/>
          });
        }
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