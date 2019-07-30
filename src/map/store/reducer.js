import {combineReducers} from 'redux';
import {reducer as olmapReducer} from '../olmap/store';
import {reducer as tocReducer} from '../toc/store';

export default combineReducers({
    olmap: olmapReducer,
    toc: tocReducer
});