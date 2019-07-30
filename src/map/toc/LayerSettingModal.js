import React, {Component} from 'react';
import {Modal,Switch,Slider} from 'antd';

class LayerSettingModal extends Component {

    constructor(props) {
        super(props);
        this.state= {
            visible: props.visible,
            onOK: props.onOK,
            onCancle: props.onCancle,
            defaultSetting: this.defaultSetting(this.props.layer)
        };
        this.onSettingOK = this.onSettingOK.bind(this);
        this.onSettingCancle = this.onSettingCancle.bind(this);
        this.onSettingChange = this.onSettingChange.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            visible: nextProps.visible,
            onOK: nextProps.onOK,
            onCancle: nextProps.onCancle,
        });
    }

    render() {

        const {layer} = this.props;

        return(
            <Modal
                title = {"图层 "+layer.get('name')+" 属性设置："}
                visible={this.state.visible}
                onOk={this.onSettingOK}
                onCancel={this.onSettingCancle}
            >
                Brightness: <Slider defaultValue={layer.get('brightness')} min={0} max={1} step={0.1} onChange={(value)=>{this.onSettingChange('brightness',value)}}/>
                Contrast: <Slider defaultValue={layer.get('contrast')} min={0} max={1} step={0.1} onChange={(value)=>{this.onSettingChange('contrast',value)}}/>
                Hue: <Slider defaultValue={layer.get('hue')} min={0} max={1} step={0.1} onChange={(value)=>{this.onSettingChange('hue',value)}}/>
                Astruation: <Slider defaultValue={layer.get('astruation')} min={0} max={1} step={0.1} onChange={(value)=>{this.onSettingChange('astruation',value)}}/>
                Opacity: <Slider defaultValue={layer.get('opacity')} min={0} max={1} step={0.1} onChange={(value)=>{this.onSettingChange('opacity',value)}}/>
                Visible: <Switch defaultChecked={layer.get('visible')} onChange={(checked)=>{this.onSettingChange('visible',checked)}}/>
            </Modal>
        );
    }

    onSettingChange(key,value) {
        this.props.layer.set(key,value);
    }

    onSettingOK() {
        this.state.onOK();
    }
    onSettingCancle() {
        this.props.layer.setProperties(this.state.defaultSetting);
        this.state.onCancle();
    }

    defaultSetting(layer) {
        return layer?layer.getProperties():{};
    }

}

export default LayerSettingModal;