import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'antd';
import {defaultPointStyle} from '../../olmap/olmapStyle';
import RegularShapePointStyleGenerator from './RegularShapePointStyleGenerator';

class VectorLayerSettingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: defaultPointStyle,
            colorPanelVisible: false
        };
        this.onStyleChange = this.onStyleChange.bind(this);
    }

    render() {

        const {layer} = this.props;

        return(
            <Modal
                title = {"矢量图层 "+layer.get('name')+" 属性设置："}
                visible={this.props.visible}
                onOk={this.props.onOK}
                onCancel={this.props.onCancle}
            >
                <RegularShapePointStyleGenerator
                    onChange={this.onStyleChange}>
                </RegularShapePointStyleGenerator>
            </Modal>
        );
    }

    onStyleChange(style){
        this.props.layer.setStyle(style);
    }

}

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

export default connect(mapStateToProps,null)(VectorLayerSettingModal);