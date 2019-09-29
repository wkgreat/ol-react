import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal,Input,Icon} from 'antd';
import ColorChooser from '../../common/ColorChooser';
import {defaultPointStyle,getPointStyleByColor} from '../../olmap/olmap';

class VectorLayerSettingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: defaultPointStyle,
            colorPanelVisible: false
        };
        this.toggleColorPanel = this.toggleColorPanel.bind(this);
        this.onColorPanelChange = this.onColorPanelChange.bind(this);
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
                填充颜色:<Input addonAfter={<Icon type="setting" onClick={this.toggleColorPanel}/>} defaultValue={this.state.fillColor} />
                <ColorChooser visible={this.state.colorPanelVisible} onColorChange={this.onColorPanelChange} onOK={this.toggleColorPanel}/>
            </Modal>
        );
    }

    onColorPanelChange(colorCode) {
        console.log(colorCode.hex);
        let layer = this.props.layer;
        let style = this.state.style;
        layer.setStyle(getPointStyleByColor(colorCode.hex));
    }

    toggleColorPanel() {
        this.setState(preState=>({
            colorPanelVisible: !preState.colorPanelVisible
        }));
    }

}

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

export default connect(mapStateToProps,null)(VectorLayerSettingModal);