import React, {Component, Fragment} from 'react';
import {Input, Button, Modal,Radio, Divider, Select, Icon, Upload} from 'antd';
import {connect} from 'react-redux';
import {actionCreators} from '../../olmap/store';
import * as olmapFuncs from "../../olmap/olmapManager";
import axios from 'axios';

class AddCSVLayerTool extends Component {

    constructor(props) {
        super(props);

        this.csvType = {
            STRING: 'string',
            FILE: 'file',
            URL: 'URL'
        };

        this.state = {

            modalVisible: false,
            okDisabled: false,

            inputName: 'CSV_Vector',
            inputCSVType: this.csvType.STRING,
            inputCSV: '',

            lonFieldIndex:0,
            latFieldIndex:1,
            timeFieldIndex:-1

        };

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onNameInputChange = this.onNameInputChange.bind(this);
        this.onCSVInputChange = this.onCSVInputChange.bind(this);
        this.readCSVFile = this.readCSVFile.bind(this);
        this.readCSVURL = this.readCSVURL.bind(this);
        this.getCSVHeadInfo = this.getCSVHeadInfo.bind(this);
        this.onModalOK = this.onModalOK.bind(this);
        this.onModalCancle = this.onModalCancle.bind(this);
    }

    render() {

        return (
            <Fragment>

                <Button ghost={false} onClick={this.onButtonClick} block={true}>添加CSV矢量图层</Button>
                <Modal
                    title = '添加CSV矢量图层'
                    visible={this.state.modalVisible}
                    onOk={this.onModalOK}
                    onCancel={this.onModalCancle}
                    okButtonProps={{disabled:this.state.okDisabled}}
                >
                    <Radio.Group onChange={this.onRadioChange} value={this.state.inputCSVType}>
                        <Radio value={this.csvType.STRING}>CSV字符串</Radio>
                        <Radio value={this.csvType.FILE}>CSV文件</Radio>
                        <Radio value={this.csvType.URL}>CSV的URL</Radio>
                    </Radio.Group>
                    <Divider/>
                    {this.getCSVSettingPanel(this.state.inputCSVType)}
                    <Divider/>
                    经度字段:
                    <Select size='small' defaultValue={this.state.lonFieldIndex} onChange={(v)=>this.setState({lonFieldIndex:v})}>
                        {this.getCSVHeadInfo()}
                    </Select>
                    纬度字段:
                    <Select size='small' defaultValue={this.state.latFieldIndex} onChange={(v)=>this.setState({latFieldIndex:v})}>
                        {this.getCSVHeadInfo()}
                    </Select>
                    时间字段:
                    <Select size='small' defaultValue={this.state.timeFieldIndex} onChange={(v)=>this.setState({timeFieldIndex:v})}>
                        <Select.Option value={-1} key={-1}>无时间字段</Select.Option>
                        {this.getCSVHeadInfo()}
                    </Select>
                </Modal>

            </Fragment>
        );

    }

    onRadioChange = e => {
      this.setState({
          inputCSVType: e.target.value
      })
    };

    getCSVSettingPanel(csvType) {
        switch (csvType) {
            case this.csvType.STRING:
                return (
                    <Fragment>
                        请输入图层名称:
                        <Input value={this.state.inputName} onChange={this.onNameInputChange}/>
                        请粘贴CSV内容:
                        <Input.TextArea placeholder='Please Enter CSV Text'
                            autosize={{ minRows: 5, maxRows: 15 }} value={this.state.inputCSV} onChange={this.onCSVInputChange}/>
                    </Fragment>
                );
            case this.csvType.FILE:
                return (
                    <Fragment>
                        请输入图层名称:
                        <Input value={this.state.inputName} onChange={this.onNameInputChange}/>
                        <Upload.Dragger action={this.readCSVFile}>
                            <p className="ant-upload-drag-icon"> <Icon type="inbox" /> </p>
                            <p className="ant-upload-text">Click or drag csv file to this area to upload</p>
                        </Upload.Dragger>
                        <Input.TextArea placeholder='Please Enter CSV Text'
                                        autosize={{ minRows: 5, maxRows: 15 }} value={this.state.inputCSV} onChange={this.onCSVInputChange}/>
                    </Fragment>
                );
            case this.csvType.URL:
                return (
                    <Fragment>
                        请输入图层名称:
                        <Input value={this.state.inputName} onChange={this.onNameInputChange}/>
                        请输入CSV的URL地址:
                        <Input.Search
                            placeholder="input CSV URL"
                            enterButton="读取"
                            size="large"
                            onSearch={value => this.readCSVURL(value)}
                        />
                        <Input.TextArea placeholder='Please Enter CSV Text'
                                        autosize={{ minRows: 5, maxRows: 15 }} value={this.state.inputCSV} onChange={this.onCSVInputChange}/>
                    </Fragment>
                );
            default:
                return "";
        }
    }

    onCSVInputChange(e) {
        this.setState({
            inputCSV: e.target.value
        });
    }

    readCSVFile(file) {
        return new Promise((resolve,reject)=>{
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                this.setState({inputCSV:reader.result});
                this.getCSVHeadInfo();
                resolve(reader.result);
            };
            reader.onerror = error => {
                this.setState({inputCSV:""});
                this.getCSVHeadInfo();
                console.error("read csv file error");
                reject("");
            }
        });
    }

    readCSVURL(url) {
        if(url) {
            axios.get(url).then(res=>{
                const data = res.data;
                this.setState({inputCSV:data});
                this.getCSVHeadInfo();
            }).catch(e=>{
                this.setState({inputCSV:""});
                this.getCSVHeadInfo();
                console.error("csv url error");
            })
        }
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

    onModalOK() {
        this.toggleModal();
        this.props.addLayer(this.props.olmap,this.state.inputName,this.state.inputCSV,{
            lon: this.state.lonFieldIndex,
            lat: this.state.latFieldIndex,
            time: this.state.timeFieldIndex
        });
    }

    onModalCancle() {
        this.toggleModal();
    }

    toggleModal() {
        this.setState((preState)=>({
            modalVisible: !preState.modalVisible
        }));
    }

    getCSVHeadInfo() {
        const csv = this.state.inputCSV;
        const head = csv.split("\n")[0];
        const fields = head.split(",");
        return fields.map((field,index)=><Select.Option value={index} key={index}>{field}</Select.Option>);
    }
}

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

const mapDispatchToProps = (dispatch) => ({
    addLayer: (olmap, name, csv, fieldIndex) => {
        const layer = olmapFuncs.makeCSVLayer(olmap,name,csv,fieldIndex);
        const action = actionCreators.addLayerAction(layer);
        dispatch(action);
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(AddCSVLayerTool);