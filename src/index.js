import React from 'react';
import ReactDOM from 'react-dom';
import MapApp from './map';
import store from "./map/store";
import {Provider} from "react-redux";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import OLMap from "./map/common/map/olmap";
import {View} from "ol";
import {fromLonLat} from "ol/proj";

document.body.onresize = function() {
    let rootDiv = document.getElementById('root');
    rootDiv.style.height = window.innerHeight+"px";
};

document.body.onchange = function() {
    let rootDiv = document.getElementById('root');
    rootDiv.style.height = window.innerHeight+"px";
};
document.body.onload = function() {
    let rootDiv = document.getElementById('root');
    rootDiv.style.height = window.innerHeight+"px";
};

ReactDOM.render(
    <Provider store={store}>
        <MapApp/>
    </Provider>,
    document.getElementById('root')
);