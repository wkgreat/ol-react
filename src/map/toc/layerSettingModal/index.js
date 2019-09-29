import React, {Component, Fragment} from 'react';
import * as OLMAP from '../../olmap/olmapManager';
import VectorLayerSettingModal from "./VectorLayerSettingModal";
import RasterLayerSettingModal from "./RasterLayerSettingModal";

class LayerSettingModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
            <Fragment>
                {this.settingModalChooser()}
            </Fragment>
        );

    }

    settingModalChooser() {

        let layerType = OLMAP.getLayerType(this.props.layer);

        switch (layerType) {
            case "VectorLayer":
                return this.vectorLayerSettingModal();
                break;
            case "ImageLayer":
                return this.rasterLayerSettingModal();
                break;
            default:
                return this.rasterLayerSettingModal();

        }

    }

    vectorLayerSettingModal() {
        return (
            <VectorLayerSettingModal
                visible={this.props.visible}
                layer={this.props.layer}
                onOK={this.props.onOK}
                onCancle={this.props.onCancle}
            />
        );
    }

    rasterLayerSettingModal() {
        return (
            <RasterLayerSettingModal
                visible={this.props.visible}
                layer={this.props.layer}
                onOK={this.props.onOK}
                onCancle={this.props.onCancle}
            />
        );

    }

}

export default LayerSettingModal;