import {constants} from "./index";

/**
 * 添加图层
 * */
export const addLayerAction = (layer) => ({

    type: constants.ADD_LAYER,
    layer

});

export const addEmptyVectorLayerAction = (layerName) => ({
    type: constants.ADD_EMPTY_VECTOR_LAYER,
    layerName
});

/**
 * 删除指定名称的图层
 * */
export const removeLayerByNameAction = (name) => ({

    type: constants.REMOVE_LAYER_BY_NAME,
    name

});

export const renameLayer = (name1,name2) => ({
    type: constants.RENAME_LAYER,
    name1,
    name2
});

/**
 * 设置图层属性
 * */
export const setLayerPropsAction = (layerName, props) => ({
    type: constants.SET_LAYER_PROPS,
    layerName,
    props
});

/**
 * 图层向上
 * */
export const layerUpAction = (layerName) => ({
    type: constants.LAYER_UP,
    layerName
});

/**
 * 图层向下移动
 * */
export const layerDownAction = (layerName) => ({
    type: constants.LAYER_DOWN,
    layerName
});