import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const Link = (props) => (
  <div id="link">
    <div id="link-message">
      <span id="link-url">http://localhost:3000/?id={props.myId}</span>
      <CopyToClipboard text={`http://localhost:3000/?id=${props.myId}`}>
        <button>Copy to clipboard</button>
      </CopyToClipboard>
    </div>
  </div>
);

Link.propTypes = {
  myId: React.PropTypes.string,
};

export default Link;