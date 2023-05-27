import { combineReducers } from 'redux-immutable';
import { reducer as recommend } from '../application/Recommend/store';

export default combineReducers({ recommend });
