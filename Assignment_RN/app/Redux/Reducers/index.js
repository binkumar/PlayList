import { combineReducers } from 'redux';

import album_list from './album_list';
import api from './api_reducer';

export default combineReducers({
  album_list,
  api,
});
