import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers, fetchUserRepos, fetchSha } from '../actions';
import axios from 'axios';

class Github extends Component {
  componentWillMount() {
    this.props.fetchUserRepos();
  }

  handleClick(userRepo){
    this.props.fetchSha(userRepo);
  }

  render(){
    return (
      <div>
        <div>
          <ul>
            {
              this.props.Repos.map((repo, index) => 
            {/* Create another component here that will take in the paths */}
                <li onClick={this.handleClick.bind(this,repo)} key={index}><a>{repo}</a></li>
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
  return bindActionCreators({ fetchUsers: fetchUsers, fetchUserRepos: fetchUserRepos, fetchSha: fetchSha },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Github);