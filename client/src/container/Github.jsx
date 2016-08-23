import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers, fetchUserRepos, fetchSha } from '../actions';
import GithubTree from '../components/TreeView';
import axios from 'axios';

class Github extends Component {
  componentWillMount() {
    this.props.fetchUserRepos();
  }

  handleClickedItem(userRepo){
    this.props.fetchSha(userRepo);
  }

  render(){
    if (!this.props.Repos) {
      return (
        <div>Please Login</div>
      )
    }
    if (this.props.Trees.length > 0) {
      return (
          <div>
            <ul>
              {
                this.props.Trees.map((file, index) =>
                  <li key={index}><a>{file.path}</a></li>
                )
              }
            </ul>
          </div>
        )
      }
    return (
      <div>
        <div>
          <ul>
           {
             this.props.Repos.map((repo, index) =>
               <GithubTree handleClickedItem={this.handleClickedItem.bind(this, repo)} data={repo} tree={this.props.Trees} key={index}/>
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
    Repos: state.Repos.repos,
    Username: state.Repos.username,
    Trees: state.Repos.trees
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUsers: fetchUsers, fetchUserRepos: fetchUserRepos, fetchSha: fetchSha },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Github);