import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../components/Link';
import axios from 'axios';
// import any other actions as well
import { params, initVid, amIHost, getPeerId, setMyId, savePeerName, saveJoinTime, savePeerJoinTime } from '../actions';
import { getMyId, peer, peerId, establishPeerCall, establishPeerConnection } from '../utilities/VideoActions';


class VideoChat extends Component {

  componentWillMount() {    
    this.props.getPeerId(); 
    getMyId().then((id) => {
      this.props.setMyId(id)
    }).catch((err) => console.error(err))
  }

  componentDidMount() {
    const sourceId = params.get('id')
    console.log(this.props)
    this.props.amIHost(); // this will update global state
    if (this.props.isHost) { // this is grabbing global state
      this.initAsSource();
    } else {
      this.initAsReceiver(sourceId);
    }

  }

  initAsSource() {
    let savepeername = this.props.savePeerName.bind(this);
    let joinTime = this.props.saveJoinTime.bind(this);
    let peerJoinTime = this.props.savePeerJoinTime.bind(this);
    let date = new Date();
    let time = '';

    if (Number(date.getHours()) > 12) {
      time = date.getHours() - 12 + ':' + date.getMinutes() + ' pm';
    } else {
      time = date.getHours() + ':' + date.getMinutes() + ' am';
    }
    joinTime(time)

    establishPeerConnection().then( (conn) => {
      console.log('time joined:', time)
      conn.send({ name: this.props.name, time: time })
      conn.on('data', (data) => {
          console.log('received', data);
          savepeername(data.name)
          peerJoinTime(data.time)
      })
    });
  }

  initAsReceiver(sourceId) {
    let savepeername = this.props.savePeerName.bind(this);
    let joinTime = this.props.saveJoinTime.bind(this);
    let peerJoinTime = this.props.savePeerJoinTime.bind(this);
    let date = new Date();
    let time = '';

    if (date.getHours() > 12) {
      time = date.getHours() - 12 + ':' + date.getMinutes() + ' pm';
    } else {
      time = date.getHours() + ':' + date.getMinutes() + ' am';
    }
    joinTime(time)
    this.props.socket.emit('new message', {
      id: this.props.myId,
      message: 'now online',
      room: this.props.roomId,
      name: this.props.name
    })

    establishPeerConnection(sourceId).then( conn => {
      conn.send({ name: this.props.name, time: time })
      conn.on('data', (data) => {
        // if the data is the SCREENSHARE DATA....
          // append it to the screenshare div. 
          console.log('received', data);
          savepeername(data.name)
          peerJoinTime(data.time)
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
        <span>
          <span onClick={this.enableVideo.bind(this)}>Enable video chat</span>
          <video id="local-video" autoPlay></video>
          <video id="remote-video" autoPlay></video>
        </span>
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
    name: state.Name.name,
    joinTime: state.JoinTime.joinTime,
    peerJoinTime: state.PeerJoinTime.peerJoinTime
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    initVid: initVid, 
    amIHost: amIHost, 
    getPeerId: getPeerId, 
    setMyId: setMyId, 
    savePeerName: savePeerName,
    saveJoinTime: saveJoinTime,
    savePeerJoinTime: savePeerJoinTime
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);