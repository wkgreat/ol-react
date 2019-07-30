import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import MapToolbar from "../toobar";
import TOC from '../toc/';
import {HeaderWrapper, TitleDiv, MapDiv} from './style';

class Olmap extends Component {

    render() {
        return (
            <Layout>
                <Layout.Header>
                    <HeaderWrapper>
                        <TitleDiv>WKGIS</TitleDiv>
                        <MapToolbar/>
                    </HeaderWrapper>

                </Layout.Header>
                <Layout>
                    <Layout.Sider width={200}> <TOC/> </Layout.Sider>
                    <Layout.Content> <MapDiv id='map'/> </Layout.Content>
                </Layout>
            </Layout>
        );
    }

    componentDidMount() {
        this.props.olmap.setTarget('map');
        this.props.olmap.on("change:propertychange",()=>{console.log("map change")});
        this.props.olmap.on("click",()=>{console.log("map click")});
        this.props.olmap.getLayers().on("change",()=>{console.log("layers change")});
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.olmap.render();
    }

}

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

export default connect(mapStateToProps,null)(Olmap);