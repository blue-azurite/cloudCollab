import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers, fetchUserRepos } from '../actions';
import axios from 'axios';

class Github extends Component {

  fetchRepos(e) {
    e.preventDefault();
    this.props.fetchUserRepos();
  }

  render(){
    return (
      <div>
          <a href="/api/github">Login with GitHub</a>
          <p></p>
          <button onClick={this.fetchRepos.bind(this)}>Get User Repos</button>
        <div>
          <ul>
            {
              this.props.Repos.map((repo, index) => 
                <li key={index}><a href="/">{repo}</a></li>
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    Repos: state.Repos.collection,
    Username: state.Repos.username
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUsers: fetchUsers, fetchUserRepos: fetchUserRepos },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Github);