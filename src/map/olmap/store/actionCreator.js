import {constants} from "./index";


export const addLayerAction = (layer) => ({

    type: constants.ADD_LAYER,
    layer

});

export const removeLayerByNameAction = (name) => ({

    type: constants.REMOVE_LAYER_BY_NAME,
    name

});

export const setLayerPropsAction = (layerName, props) => ({
    type: constants.SET_LAYER_PROPS,
    layerName,
    props
});

export const layerUpAction = (layerName) => ({
    type: constants.LAYER_UP,
    layerName
});

export const layerDownAction = (layerName) => ({
    type: constants.LAYER_DOWN,
    layerName
});