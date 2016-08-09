import { combineReducers } from 'redux';
import Text from './reducer_text';

const rootReducer = combineReducers({
  Text: Text
});

export default rootReducer;