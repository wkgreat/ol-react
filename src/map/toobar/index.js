import React, {Component, Fragment} from 'react';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import * as tools from './tools';
import {Col, Icon, Menu, Row} from "antd";
import {TitleDiv} from "../style";
import logo from "../static/logo.gif";
import ReactDOM from "react-dom";
import {DarwerSetter} from "../common/components/DarwerSetter";
import ScalaBarSetting from "../common/components/scalebar/scalabarSetting";
import IconFont from "../common/components/IconFont";

class MapToobar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addCSVLayerToolVisible: false,
            addWKTLayerToolVisible: false,
            addXYZLayerToolVisible: false,
            scalaBarToolVisible: false
        };
    }

    render() {

        return (
            <Fragment>
                <Row>
                    <Col span={4}>
                        <TitleDiv><img src={logo} height={40} alt='logo'/></TitleDiv>
                    </Col>
                    <Col span={20}>
                        <Menu mode="horizontal">
                            <Menu.SubMenu title={
                                <span className="submenu-title-wrapper">
                                        <Icon type="desktop"/>
                                        地图显示
                                    </span>
                            }>
                                <Menu.Item key="display:scalabar"
                                           onClick={this.setVisible("scalaBarToolVisible")}>
                                    <IconFont type="icon-Ruler" />
                                    显示比例尺
                                </Menu.Item>
                            </Menu.SubMenu>

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
                                               onClick={this.setVisible("addXYZLayerToolVisible")}>添加XYZ矢量图层
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

                            <Menu.SubMenu title={
                                <span className="submenu-title-wrapper">
                                        <Icon type="experiment"/>
                                        空间分析
                                    </span>
                            }>
                                <Menu.Item key="display:scalabar"
                                           disabled={true}
                                           onClick={this.setVisible("scalaBarToolVisible")}>
                                    <IconFont type="iconruler-alt-"/>
                                    测距
                                </Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Col>
                </Row>

                <DarwerSetter
                    visible={this.state.scalaBarToolVisible}
                    onOK={this.setInvisible("scalaBarToolVisible")}
                    onCancel={this.setInvisible("scalaBarToolVisible")}
                    name = "比例尺设置"
                    olmap={this.props.olmap}
                    components = {{
                        ScalaBarSetting: ScalaBarSetting
                    }}
                />

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