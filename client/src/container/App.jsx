import React, { Component } from 'react';
import TextEditor from '../container/TextEditor';
import VideoChat from '../container/Video';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initVidAsHost, amIHost, getPeerId, getLink } from '../actions';
import Link from '../components/Link';
import { peer, getMyId } from '../utilities/VideoActions';


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      myId: ''
    }


  }


  componentDidMount() {
    getMyId().then((id) => {
      this.setState({
        myId: id
      })
    }).catch((err) => console.log('Error getting ID.', err));
  }

  render() {
    return (
      <div>
        {console.log(this.state.myId)}
        {this.props.showLink ? <Link myId={this.state.myId} /> : null}
        <div>
          <TextEditor />
        </div>
        <div>
          <VideoChat />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  return {
    isHost: true,
    localStream: null, 
    showLink: true,
    peerId: null
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initVidAsHost: initVidAsHost, amIHost: amIHost, getPeerId: getPeerId, getLink: getLink }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);