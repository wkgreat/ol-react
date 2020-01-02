import React, {Component} from 'react';
import {Icon, Input, InputNumber} from "antd";
import ColorChooser from "../../common/ColorChooser";
import {getPointRegularShapeStyle} from "../../olmap/olmapStyle";

class RegularShapePointStyleGenerator extends Component {

    FILL_COLOR='fillColor';
    STROKE_COLOR='strokeColor';

    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            radius: 5,
            angle: 0,
            rotation: 0,
            fillColor: 'blue',
            strokeColor: 'blue',
            strokeWidth: 1,
            whichColor: 'fillColor',
            colorPanelVisible: false
        };
        this.toggleColorPanel = this.toggleColorPanel.bind(this);
        this.onColorPanelChange = this.onColorPanelChange.bind(this);
        this.onPointsChange = this.onPointsChange.bind(this);
        this.onStrokeWidthChange = this.onStrokeWidthChange.bind(this);
        this.onRadiusChange = this.onRadiusChange.bind(this);
        this.onAngleChange = this.onAngleChange.bind(this);
    }

    render() {
        return (
            <div>
                边数:
                <InputNumber size='small' style={{width:'50px'}}
                             defaultValue={0} min={0} max={10} onChange={this.onPointsChange} />
                边线宽度:
                <InputNumber size='small' style={{width:'50px'}}
                             defaultValue={2} min={0} max={100} onChange={this.onStrokeWidthChange} />
                半径:
                <InputNumber size='small' style={{width:'50px'}}
                             defaultValue={10} min={0} max={100} onChange={this.onRadiusChange} />
                角度:
                <InputNumber size='small' style={{width:'50px'}}
                             defaultValue={0} min={0} max={360} onChange={this.onAngleChange} />
                <br/>
                填充颜色:
                <Input
                    addonAfter={<Icon type="setting" onClick={()=>this.toggleColorPanel(this.FILL_COLOR)}/>}
                    defaultValue={this.state.fillColor}
                    value={this.state.fillColor}
                />
                边线颜色:
                <Input
                    addonAfter={<Icon type="setting" onClick={()=>this.toggleColorPanel(this.STROKE_COLOR)}/>}
                    defaultValue={this.state.strokeColor}
                    value={this.state.strokeColor}
                />
                <ColorChooser
                    visible={this.state.colorPanelVisible}
                    onColorChange={this.onColorPanelChange}
                    onOK={this.toggleColorPanel}
                />
            </div>

        );
    }

    shouldUpdateStyle(prevState) {
        return Object.keys(this.state)
            .filter(k=>k!=='colorPanelVisible')
            .some(k=>prevState[k]!==this.state[k]);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.shouldUpdateStyle(prevState)) {
            let style = getPointRegularShapeStyle(this.state);
            this.props.onChange(style);
        }
    }

    toggleColorPanel(whichColor) {
        this.setState(preState=>({
            whichColor,
            colorPanelVisible: !preState.colorPanelVisible
        }));
    }


    onColorPanelChange(colorCode) {
        switch (this.state.whichColor) {
            case this.FILL_COLOR:
                this.setState({
                    fillColor: colorCode.hex
                });
                break;
            case this.STROKE_COLOR:
                this.setState({
                    strokeColor: colorCode.hex
                });
                break;
            default:
                break;
        }
    }


    onPointsChange(points) {
        this.setState({points});
    }

    onStrokeWidthChange(strokeWidth) {
        this.setState({strokeWidth});
    }

    onRadiusChange(radius) {
        this.setState({radius});
    }

    onAngleChange(angle) {
        angle = angle * Math.PI /180.0;
        this.setState({angle});
    }


}

export default RegularShapePointStyleGenerator;
