import React, {Component, Fragment} from 'react';
import {Button, Input, Modal} from 'antd';
import {connect} from 'react-redux';
import {actionCreators} from '../../olmap/store';
import * as olmapFuncs from "../../olmap/olmapManager";

class AddXYZLayerTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputName: 'OSM Black and White',
            inputURL: 'http://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
            modalVisible: false
        };
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onURLInputChange = this.onURLInputChange.bind(this);
        this.onNameInputChange = this.onNameInputChange.bind(this);
        this.onModalOK = this.onModalOK.bind(this);
        this.onModalCancle = this.onModalCancle.bind(this);
    }

    render() {

        const {olmap, onAddXYZLayer} = this.props;

        return (
            <Fragment>

                <Button ghost={false} onClick={this.onButtonClick} block={true}>添加XYZ图层</Button>
                <Modal
                    title = '添加XYZ图层'
                    visible={this.state.modalVisible}
                    onOk={()=>this.onModalOK(olmap,onAddXYZLayer)}
                    onCancel={this.onModalCancle}
                >
                    请输入图层名称:
                    <Input value={this.state.inputName} onChange={this.onNameInputChange}/>
                    请输入XYZ图层URL:
                    <Input value={this.state.inputURL} onChange={this.onURLInputChange}/>
                </Modal>

            </Fragment>
        );
    }

    onURLInputChange(e) {
        const inputURL = e.target.value;
        this.setState((preState)=>({
            inputURL
        }));
    }

    onNameInputChange(e) {
        const inputName = e.target.value;
        this.setState((preState)=>({
            inputName
        }));
    }


    onButtonClick() {
        this.toggleModal();
    }

    onModalOK(olmap, addLayer) {
        this.toggleModal();
        addLayer(olmap,this.state.inputName,this.state.inputURL);
    }

    onModalCancle() {
        this.toggleModal();
    }

    toggleModal() {
        this.setState((preState)=>({
            modalVisible: !preState.modalVisible
        }));
    }

}

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

const mapDispatchToProps = (dispatch)=>({
    onAddXYZLayer: (olmap,name,url)=> {
        const layer = olmapFuncs.makeXYZLayer(olmap,name, url);
        const action = actionCreators.addLayerAction(layer);
        dispatch(action);
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(AddXYZLayerTool);