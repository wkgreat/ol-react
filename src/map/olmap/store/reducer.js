import * as constants from './actionTypes';
import * as OLMAP from '../../common/map/olmapLayer';
import OLMap from "../../common/map/olmap";

const olmap = new OLMap();

const defaultState = {
    version: 0,
    layerVersion: 0,
    olmap,
    layerNums: 1
};


const copyState = (state) => ({
    version: state.version + 1,
    layerVersion: state.layerVersion,
    olmap: state.olmap,
    layerNums: state.olmap.getLayers().getArray().length,
});


export default ((state = defaultState, action) => {

    let newState;

    switch (action.type) {
        case constants.ADD_LAYER:
            state.olmap.addLayer(action.layer);
            OLMAP.zoomToLayer(state.olmap, action.layer.get('name'));
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion + 1;
            return newState;
        case constants.REMOVE_LAYER_BY_NAME:
            OLMAP.removeLayerByName(state.olmap, action.name);
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion + 1;
            return newState;
        case constants.SET_LAYER_PROPS:
            OLMAP.setLayerProps(state.olmap, action.name, action.props);
            newState = copyState(state);
            return newState;
        case constants.LAYER_UP:
            OLMAP.layerUp(state.olmap, action.layerName);
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion + 1;
            return newState;
        case constants.LAYER_DOWN:
            OLMAP.layerDown(state.olmap, action.layerName);
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion + 1;
            return newState;

        default:
            return state;
    }

});