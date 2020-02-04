import React, {Component, Fragment} from 'react';
import Olmap from "./olmap";
import {connect, Provider} from 'react-redux';
import store from './store';
import {GlobalStyle} from '../style';
import 'antd/dist/antd.css';
import './static/iconfont/iconfont.css';
import {TOCWrapper} from "./style";
import MapToolbar from "./toobar";
import TOC from "./toc";
import {Layout} from "antd";
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