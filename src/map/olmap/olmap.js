import VectorLayer from 'ol/layer/Vector';
import Style from "ol/style/Style";
import {Circle, Fill, RegularShape, Stroke} from "ol/style";

export const defaultPointStyle = new Style({

    image: new Circle({
        fill: new Fill({color:'red'}),
        stroke: new Stroke({color:'blue', width:2}),
        radius: 5

    })

});

//get a regular shape point style
export const getPointRegularShapeStyle = (props) => {
    const
        points = props.points || 0,
        radius = props.radius || 10,
        angle = props.angle || 0,
        rotation = props.rotation || 0,
        fillColor = props.fillColor || 'blue',
        strokeColor = props.strokeColor || 'blue',
        strokeWidth = props.strokeWidth || 2;

    if(points<=0) {
        return new Style({
            image: new Circle({
                fill: new Fill({color:fillColor}),
                stroke: new Stroke({color:strokeColor, width:strokeWidth}),
                radius
            })
        });
    } else {
        return new Style({
            image: new RegularShape({
                points,
                angle,
                rotation,
                fill: new Fill({color: fillColor}),
                stroke: new Stroke({color:strokeColor, width:strokeWidth}),
                radius
            })

        });
    }
};
