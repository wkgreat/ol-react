import {combineReducers} from 'redux';
import {reducer as olmapReducer} from '../olmap/store';
import {reducer as tocReducer} from '../toc/store';

const defaultState = {
    themeColor: "rgb(24,84,82)",
    headerHeight: "48px"
};

const mapapp = (state=defaultState, action) => {
    return state;
};

export default combineReducers({
    olmap: olmapReducer,
    toc: tocReducer,
    mapapp: mapapp
});