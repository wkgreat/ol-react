import * as constants from './actionTypes';
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {fromLonLat} from 'ol/proj';
import * as OLMAP from '../olmapManager';

const osmLayer = new TileLayer({
    name: 'osm',
    source: new OSM()
});

const olmap = new Map({
    view: new View({
        center: fromLonLat([118.794315,32.050167]),
        zoom: 10
    }),
    controls:[],
    layers: [osmLayer]
});


const defaultState = {
    version: 0,
    layerVersion:0,
    olmap: olmap,
    layerNums: 1
};


const copyState = (state) => ({
    version: state.version+1,
    layerVersion: state.layerVersion,
    olmap: state.olmap,
    layerNums: state.olmap.getLayers().getArray().length,
});


export default ((state = defaultState, action)=> {

    let newState;

    switch (action.type) {
        case constants.ADD_LAYER:
            state.olmap.addLayer(action.layer);
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion+1;
            return newState;
        case constants.REMOVE_LAYER_BY_NAME:
            OLMAP.removeLayerByName(state.olmap,action.name);
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion+1;
            return newState;
        case constants.SET_LAYER_PROPS:
            OLMAP.setLayerProps(state.olmap,action.name,action.props);
            newState = copyState(state);
            return newState;
        case constants.LAYER_UP:
            OLMAP.layerUp(state.olmap,action.layerName);
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion+1;
            return newState;
        case constants.LAYER_DOWN:
            OLMAP.layerDown(state.olmap,action.layerName);
            newState = copyState(state);
            newState.layerVersion = newState.layerVersion+1;
            return newState;

        default:
            return state;
    }

});