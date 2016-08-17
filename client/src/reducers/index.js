import { combineReducers } from 'redux';
import Text from './reducer_text';
import Host from './reducer_host';
import PeerId from './reducer_peerId';
import MyId from './reducer_myId';
import Repos from './reducer_github';
import Socket from './reducer_socket';
import Output from './reducer_output';

const rootReducer = combineReducers({
  Text: Text,
  Host: Host, 
  PeerId: PeerId,
  MyId: MyId,
  Repos: Repos,
  Socket: Socket,
  Output: Output
});
// Change name of Repos to something more 
// generic for github requests/responses?
export default rootReducer;