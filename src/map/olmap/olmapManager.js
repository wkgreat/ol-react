import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import ImageLayer from "ol/layer/Image";
import {Group} from "ol/layer";
import BaseLayer from "ol/layer/Base";
import {defaultPointStyle} from './olmap';

function* layerIdGenerator() {
    let id = 1;
    while (true) {
        yield id;
        id += 1;
    }
}

//layer编号生成
export const layerIDGen = layerIdGenerator();

//生成图层唯一名称，要判断地图里面有没有重名的，如果有需要添加唯一编号
export const genLayerName = (olmap, name) => {
    name = name || "layer";
    const layersNames = olmap.getLayers().getArray().map(l => l.get('name'));
    return layersNames.includes(name) ? name + "_" + layerIDGen.next().value : name;
};

//使用提供的xyz瓦片的url生成图层
export const makeXYZLayer = (olmap, name, url) => {
    const layer = new TileLayer({
        name: genLayerName(olmap, name),
        source: new XYZ({
            url
        })
    });
    return layer;

};

//得到指定名字的图层
export const findLayerByName = (olmap, name) => {
    return olmap.getLayers().getArray().find(layer => layer.get('name') === name);
};

//得到指定名字的图层index，相当于图层在地图中的顺序
export const findLayerIndexByName = (olmap, name) => {
    return olmap.getLayers().getArray().findIndex(layer => layer.get('name') === name);
};

//删除指定名字的图层
export const removeLayerByName = (olmap, name) => {

    const layer = findLayerByName(olmap, name);
    if (layer) {
        olmap.removeLayer(layer);
    }

};

//设置指定名字的图层的属性
export const setLayerProps = (olmap, name, props) => {
    const layer = findLayerByName(olmap, name);
    if (layer) {
        layer.setProperties(props);
    }
};

//使用csv数据生成矢量图层
export const makeCSVLayer = (olmap, name, csv, fieldIndex) => {

    const features = csv
        .split("\n") //拆分行
        .slice(1) //去掉第一行
        .filter(s => s != null && s.length > 0) //去掉空行
        .map(r => {
            const values = r.split(",");
            const lon = values[fieldIndex['lon']] * 1.0;
            const lat = values[fieldIndex['lat']] * 1.0;
            const timeIndex = fieldIndex['time'] * 1;
            const time = (timeIndex < 0) ? '' : values[timeIndex];
            return new Feature({
                geometry: new Point(fromLonLat([lon, lat])),
                name: time
            });
        });

    return new VectorLayer({
        source: new VectorSource({
            features
        }),
        name: genLayerName(olmap, name),
        style: defaultPointStyle
    });

};

export const layerUp = (olmap, name) => {
    const layerIndex = findLayerIndexByName(olmap, name);
    const layerNums = olmap.getLayers().getLength();
    if (layerIndex !== -1 && layerIndex < layerNums - 1) {
        const theLayer = olmap.getLayers().item(layerIndex);
        olmap.removeLayer(theLayer);
        olmap.getLayers().insertAt(layerIndex + 1, theLayer);
    }
};

export const layerDown = (olmap, name) => {
    const layerIndex = findLayerIndexByName(olmap, name);
    if (layerIndex > 0) {
        const theLayer = olmap.getLayers().item(layerIndex);
        olmap.removeLayer(theLayer);
        olmap.getLayers().insertAt(layerIndex - 1, theLayer);
    }
};

export const zoomToLayer = (olmap, name) => {
    const layer = findLayerByName(olmap, name);
    if (layer instanceof VectorLayer) {
        olmap.getView().fit(layer.getSource().getExtent());
    }
};

export const getLayerType = layer => {
    if(layer instanceof VectorLayer) {
        return "VectorLayer";
    } else if (layer instanceof ImageLayer) {
        return "ImageLayer";
    } else if (layer instanceof TileLayer) {
        return "TileLayer";
    } else if (layer instanceof Group) {
        return "Group";
    } else {
        return "BaseLayer";
    }
};