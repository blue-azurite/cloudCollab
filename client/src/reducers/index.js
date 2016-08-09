import { combineReducers } from 'redux';
import Text from './reducer_text'
const rootReducer = combineReducers({
  text: Text
});

export default rootReducer;