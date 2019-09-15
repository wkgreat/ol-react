import React, {Component,Fragment} from 'react';
import {connect} from 'react-redux';
import MapToolbar from "../toobar";
import TOC from '../toc/';
import {HeaderWrapper, TitleDiv, MapDiv,TOCWrapper} from './style';

class Olmap extends Component {

    render() {
        return (
            <Fragment>
                <HeaderWrapper>
                    <TitleDiv>WKGIS</TitleDiv>
                    <MapToolbar/>
                </HeaderWrapper>
                <MapDiv id='map'/>
                <TOCWrapper><TOC/></TOCWrapper>
            </Fragment>
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