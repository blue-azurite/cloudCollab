import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers, fetchUserRepos, fetchSha } from '../actions';
import axios from 'axios';

class GithubTree extends Component {
	constructor(props) {
		super(props);
	}

  render(){
    return (
      <div>
      	<li onClick={()=> this.props.handleClickedItem(this.props.data)}><a>{this.props.data}</a></li>
        <div>Hey{this.props.tree}</div>
      </div>
    )
  }
}

export default GithubTree;