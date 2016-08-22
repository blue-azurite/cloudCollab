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
      <div id="link">
        <div id="link-message">
          <CopyToClipboard text={`http://localhost:3000/?id=${ sourceId ? sourceId : this.props.myId }`}>
            <button className="btn btn-primary btn-sm">Copy share link</button>
          </CopyToClipboard>
        </div>
      </div>
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