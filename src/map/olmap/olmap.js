import VectorLayer from 'ol/layer/Vector';
import Style from "ol/style/Style";
import {Circle, Fill, Stroke} from "ol/style";

export const defaultPointStyle = new Style({

    image: new Circle({

        fill: new Fill({color:'red'}),
        stroke: new Stroke({color:'blue', width:2}),
        radius: 5

    })

});

export const getPointStyleByColor = color => {

    return new Style({

        image: new Circle({

            fill: new Fill({color: color}),
            stroke: new Stroke({color:'blue', width:2}),
            radius: 5

        })

    });

};
