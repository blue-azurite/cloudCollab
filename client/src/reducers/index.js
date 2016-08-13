import { combineReducers } from 'redux';
// import Text from './reducer_text';
import Host from './reducer_host';
import PeerId from './reducer_peerId';
import Link from './reducer_showLink';
import MyId from './reducer_myId';
import Repos from './reducer_github';
import Socket from './reducer_socket';

const rootReducer = combineReducers({
  // Text: Text,
  Host: Host, 
  PeerId: PeerId,
  Link: Link,
  MyId: MyId,
  Repos: Repos,
  Socket: Socket
});

export default rootReducer;