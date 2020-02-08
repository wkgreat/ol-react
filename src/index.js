import React from 'react';
import ReactDOM from 'react-dom';
import MapApp from './map';
import store from "./map/store";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <MapApp/>
    </Provider>,
    document.getElementById('root')
);