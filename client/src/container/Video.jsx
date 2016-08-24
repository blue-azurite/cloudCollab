import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../components/Link';
import axios from 'axios';
// import any other actions as well
import { params, initVid, amIHost, getPeerId, setMyId, savePeerName } from '../actions';
import { getMyId, peer, peerId, establishPeerCall, establishPeerConnection } from '../utilities/VideoActions';


class VideoChat extends Component {
  constructor() {
    super()

    // this.props.socket.on('peer name', function(peerName) {
    //   console.log('peer name saved', peerName);
    //   this.props.savePeerName(peerName);
    // })
  }


  componentWillMount() {    
    this.props.getPeerId(); 
    getMyId().then((id) => {
      this.props.setMyId(id)
    }).catch((err) => console.error(err))
  }

  componentDidMount() {
    const sourceId = params.get('id')
    this.props.amIHost(); // this will update global state
    if (this.props.isHost) { // this is grabbing global state
      this.initAsSource();
    } else {
      this.initAsReceiver(sourceId);
    }

    const savepeername = this.props.savePeerName.bind(this);
    this.props.socket.on('peer name', function(peerName) {
      console.log('peer name saved', peerName);
      savepeername(peerName);
    })

  }

  initAsSource() {
    var date = new Date();
    var time = '';
    if (date.getHours() > 12) {
      time.concat(date.getHours() - 12 + ':' + date.getMinutes() + ' pm');
    } else {
      time.concat(date.getHours() + ':' + date.getMinutes() + ' am');
    }

    establishPeerConnection().then( (conn) => {
      console.log('Peer connection: connected as host!', conn)
      this.props.socket.emit('join room', {
        room: this.props.roomId, 
        peerName: this.props.name
      })
      conn.on('data', (data) => {
        // if the data is the SCREENSHARE DATA....
          // append it to the screenshare div. 
      })
    });
  }

  initAsReceiver(sourceId) {
    var date = new Date();
    var time = '';
    if (date.getHours() > 12) {
      time.concat(date.getHours() - 12 + ':' + date.getMinutes() + ' pm');
    } else {
      time.concat(date.getHours() + ':' + date.getMinutes() + ' am');
    }

    establishPeerConnection(sourceId).then( conn => {
      console.log('Peer connection: connected to host! ᕙ༼ຈل͜ຈ༽ᕗ ', conn)
      this.props.socket.emit('join room', {
        room: this.props.roomId, 
        peerName: this.props.name
      })
    });
  }

  enableVideo() {
    // if host...initAsHost
    if (this.props.isHost) {
      this.props.initVid();
    } else {
      // if receiver...initAsReceiver
      this.props.initVid(this.props.peerId)
    }
  }


  render() {
    return(
      <div id="video" className="mediaDiv"> 
        <Link />
        <button className="btn btn-primary btn-sm vid-btn" onClick={this.enableVideo.bind(this)}>Enable video chat</button>
        <video id="local-video" autoPlay></video>
        <video id="remote-video" autoPlay></video>
      </div>
    )
  }

}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  return {
    roomId: state.RoomId.roomId,
    socket: state.Socket.socket,
    isHost: state.Host.isHost,
    peerId: state.PeerId.peerId,
    myId: state.MyId.myId,
    input: state.Text.text, 
    peerName: state.PeerName.peerName,
    name: state.Name.name
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    initVid: initVid, 
    amIHost: amIHost, 
    getPeerId: getPeerId, 
    setMyId: setMyId, 
    savePeerName: savePeerName
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);