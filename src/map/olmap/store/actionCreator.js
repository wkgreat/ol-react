import {constants} from "./index";

/**
 * 添加图层
 * */
export const addLayerAction = (layer) => ({

    type: constants.ADD_LAYER,
    layer

});

/**
 * 删除指定名称的图层
 * */
export const removeLayerByNameAction = (name) => ({

    type: constants.REMOVE_LAYER_BY_NAME,
    name

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