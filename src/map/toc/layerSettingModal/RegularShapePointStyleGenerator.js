import React, {Component} from 'react';
import {Icon, Input, Modal} from "antd";
import ColorChooser from "../../common/ColorChooser";
import {getPointRegularShapeStyle} from "../../olmap/olmap";

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
    }

    render() {
        return (
            <div>
                填充颜色:
                <Input
                    addonAfter={<Icon type="setting" onClick={()=>this.toggleColorPanel(this.FILL_COLOR)}/>}
                    defaultValue={this.state.fillColor}
                    value={this.state.fillColor}
                />
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
        debugger;
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

}

export default RegularShapePointStyleGenerator;
