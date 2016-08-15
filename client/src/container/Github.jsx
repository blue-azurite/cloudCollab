import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers, fetchUserRepos } from '../actions';
import axios from 'axios';

class Github extends Component {
  constructor(props) {

    this.state = {
      data: ''
    }
  }

  fetchRepos() {
    axios.get('/api/github/repos')
      .then(response => {
        // console.log(response.data[0].name);
        this.setState({
          data: response.data
        });
      });
  }

  render(){
    return (
      <div>
        <div>
          <a href="/api/github">Login with GitHub</a>
        </div>
        <div>
          <div onClick={this.fetchRepos.bind(this)}>Get User Repos</div>
          <ul>
            <li data={this}></li>
          </ul>
        </div>
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
  return bindActionCreators({ fetchUsers: fetchUsers, fetchUserRepos: fetchUserRepos },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Github);