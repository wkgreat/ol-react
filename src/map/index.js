import React, {Component} from 'react';
import Olmap from "./olmap";
import {Provider} from 'react-redux';
import store from './store';
import {GlobalStyle} from '../style';
import 'antd/dist/antd.css';
import './static/iconfont/iconfont.css';

class MapAPP extends Component {
    render() {
        return(
            <Provider store={store}>
                <GlobalStyle/>
                <Olmap />
            </Provider>
        );
    }
}

export default MapAPP;