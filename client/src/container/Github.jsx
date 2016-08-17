import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers, fetchUserRepos } from '../actions';
import axios from 'axios';

class Github extends Component {
  componentWillMount() {
    this.props.fetchUserRepos();
  }

  render(){
    return (
      <div>
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