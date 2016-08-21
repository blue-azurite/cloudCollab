import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers, fetchUserRepos, fetchSha } from '../actions';
import axios from 'axios';

class GithubTree extends Component {
	constructor(props) {
		super(props);
	}

	// handleClick(repo) {
	// 	console.log('Hey Yuyi! Julius is mean!');
	// 	return this.props.handleClickedItem(repo);
	// }

  render(){
    return (
      <div>
        <h1>HELLO</h1>
      </div>
    )
  }
}

export default GithubTree;