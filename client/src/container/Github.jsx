import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers, fetchUserRepos, fetchSha, fetchFileContents, fetchRecursiveTree } from '../actions';
import GithubTree from '../components/TreeView';
import axios from 'axios';

class Github extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedRepo: ''
    }
  }
  componentWillMount() {
    this.props.fetchUserRepos();
  }

  handleClickedItem(userRepo){
    this.props.fetchSha(userRepo);
    this.setState({
      selectedRepo: userRepo
    });
  }
  handleFileClick(path, type, url){
    let repo = this.state.selectedRepo;
    if (type === 'blob') {
      this.props.fetchFileContents(path, repo);
      setTimeout(() => {
        var content = this.props.Content;
        if(typeof content !== 'string'){
          content = JSON.stringify(content);
        }
        var contentToRoom = {
          text: content,
          room: this.props.roomId
        };
        this.props.socket.emit('change text', contentToRoom);
      }, 1000);

    } else if (type === 'tree') {
      this.props.fetchRecursiveTree(url);
    }
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
                  <li onClick={this.handleFileClick.bind(this, file.path, file.type, file.url)} key={index}><a>{file.path}</a></li>
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
    Trees: state.Repos.trees,
    Content: state.Repos.contents,
    RecursiveTrees: state.Repos.recursiveTrees,
    roomId: state.RoomId.roomId,
    socket: state.Socket.socket
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUsers: fetchUsers, fetchUserRepos: fetchUserRepos, fetchSha: fetchSha, fetchFileContents: fetchFileContents, fetchRecursiveTree:fetchRecursiveTree },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Github);