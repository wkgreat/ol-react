import React, {Component, Fragment} from 'react';
import Olmap from "./olmap";
import {Provider} from 'react-redux';
import store from './store';
import {GlobalStyle} from '../style';
import 'antd/dist/antd.css';
import './static/iconfont/iconfont.css';
import {HeaderWrapper, TitleDiv, TOCWrapper} from "./style";
import logo from "./static/logo.gif";
import MapToolbar from "./toobar";
import TOC from "./toc";
import {Icon, Menu, SubMenu} from "antd";

class MapAPP extends Component {
    render() {
        return(
            <Provider store={store}>
                <GlobalStyle/>
                <MapToolbar/>
                <Olmap/>
                <TOCWrapper><TOC/></TOCWrapper>
            </Provider>
        );
    }
}

export default MapAPP;