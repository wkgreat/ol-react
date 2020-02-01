import React, {Component, Fragment} from 'react';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import * as tools from './tools';
import {Col, Icon, Menu, Row} from "antd";
import {TitleDiv} from "../style";
import logo from "../static/logo.gif";

class MapToobar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addCSVLayerToolVisible: false,
            addWKTLayerToolVisible: false,
            addXYZLayerToolVisible: false
        };
    }

    render() {

        return (
            <Fragment>
                <Row>
                    <Col span={4}>
                        <TitleDiv><img src={logo} height={42} alt='logo'/></TitleDiv>
                    </Col>
                    <Col span={20}>
                        <Menu mode="horizontal">
                            <Menu.SubMenu
                                title={
                                    <span className="submenu-title-wrapper">
                                <Icon type="appstore"/>
                                图层添加
                            </span>
                                }
                            >
                                <Menu.ItemGroup title="栅格图层">

                                    <Menu.Item key="setting:addXYZLayer"
                                               onClick={this.setVisible("addXYZLayerToolVisible")}>添加WKT矢量图层
                                    </Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup title="矢量图层">
                                    <Menu.Item key="setting:addCSVLayer"
                                               onClick={this.setVisible("addCSVLayerToolVisible")}>添加CSV矢量图层
                                    </Menu.Item>
                                    <Menu.Item key="setting:addWKTLayer"
                                               onClick={this.setVisible("addWKTLayerToolVisible")}>添加WKT矢量图层
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </Menu.SubMenu>
                        </Menu>
                    </Col>
                </Row>
                <tools.AddXYZLayerTool
                    visible={this.state.addXYZLayerToolVisible}
                    onOK={this.setInvisible("addXYZLayerToolVisible")}
                    onCancel={this.setInvisible("addXYZLayerToolVisible")}
                />
                <tools.AddCSVLayerTool
                    visible={this.state.addCSVLayerToolVisible}
                    onOK={this.setInvisible("addCSVLayerToolVisible")}
                    onCancel={this.setInvisible("addCSVLayerToolVisible")}
                />
                <tools.AddWKTLayerTool
                    visible={this.state.addWKTLayerToolVisible}
                    onOK={this.setInvisible("addWKTLayerToolVisible")}
                    onCancel={this.setInvisible("addWKTLayerToolVisible")}
                />
            </Fragment>
        );
    }

    setVisible(key) {
        let p = {};
        p[key] = true;
        return () => {
            this.setState(p);
        }
    }

    setInvisible(key) {
        let p = {};
        p[key] = false;
        return () => {
            this.setState(p);
        }
    }

}


const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MapToobar);