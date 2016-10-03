import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import axios from 'axios';
import { params } from '../actions';

const sourceId = params.get('id');

class Link extends Component {

  render() {
    return(
      <CopyToClipboard text={`http://52.52.149.74:3000/?id=${ sourceId ? sourceId : this.props.myId }`}>
        <span className="shareLink">Copy share link</span>
      </CopyToClipboard>
    )
  }
};

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  return {
    myId: state.MyId.myId
  }
}

export default connect(mapStateToProps)(Link);