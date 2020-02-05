import React, {Component, Fragment} from 'react';
import Olmap from "./common/components";
import {connect, Provider} from 'react-redux';
import store from './store';
import {GlobalStyle} from '../style';
import 'antd/dist/antd.css';
import './static/iconfont/iconfont.css';
import {TOCWrapper} from "./style";
import MapToolbar from "./common/components/toobar";
import TOC from "./common/components/toc";
import {Layout} from "antd";
import AddDrawLayer from "./common/components/draw/addDrawLayer.js";
const {Header,Content} = Layout;

const MapAPP = (props) => (
    <Fragment>
        <GlobalStyle/>
        <Layout>
            <Header {...props.header}>
                <MapToolbar/>
            </Header>
        </Layout>
        <Olmap/>
        <TOC/>
        <AddDrawLayer/>
    </Fragment>
);

const state2props = (state) => ({
    header: {
        style: {
            height: state.mapapp.headerHeight,
            backgroundColor: state.mapapp.themeColor
        }
    }
});

export default connect(state2props,null)(MapAPP);