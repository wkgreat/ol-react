import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import * as tools from './tools';
import './maptoolbar.css'
import styled from 'styled-components';

class MapToobar extends Component {

    render() {

        return (
            <MapToobarWrapper id='maptoolbar'>

                <tools.AddXYZLayerTool/>
                <tools.AddCSVLayerTool/>

            </MapToobarWrapper>
        );
    }
}

const MapToobarWrapper = styled.div`

    position: absolute;
    top: 42px;
    width: 160px;
    z-index: 99;
    opacity: 1;
    
    .button {
      border: 1px solid red;
    }
    

`;


const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps,mapDispatchToProps)(MapToobar);