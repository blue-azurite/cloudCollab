import { combineReducers } from 'redux';
import Text from './reducer_text';
import Video from './reducer_video';
import Host from './reducer_host';
import PeerId from './reducer_peerId';
// import ShowLink from './reducer_showLink';

const rootReducer = combineReducers({
  Text: Text,
  Video: Video,
  Host: Host, 
  PeerId: PeerId
});

export default rootReducer;