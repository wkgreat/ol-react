import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

const id = "map-div";

const MapDiv = styled.div`
    height: 100%;
    background-color: #040508;
`;

class Olmap extends Component {

    render() {
        return (
            <div id={id}/>
        );
    }

    componentDidMount() {
        this.props.olmap.setTarget(id);
        this.props.olmap.on("change:propertychange", () => {
            console.log("map change")
        });
        this.props.olmap.on("click", () => {
            console.log("map click")
        });
        this.props.olmap.getLayers().on("change", () => {
            console.log("layers change")
        });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.olmap.render();
    }

}

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

export default connect(mapStateToProps, null)(Olmap);