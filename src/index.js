import React from 'react';
import ReactDOM from 'react-dom';
import MapApp from './map';

document.body.onresize = function() {
    let rootDiv = document.getElementById('root');
    rootDiv.style.height = window.innerHeight+"px";
};

document.body.onchange = function() {
    let rootDiv = document.getElementById('root');
    rootDiv.style.height = window.innerHeight+"px";
};
document.body.onload = function() {
    let rootDiv = document.getElementById('root');
    rootDiv.style.height = window.innerHeight+"px";
};

ReactDOM.render(<MapApp/>, document.getElementById('root'));