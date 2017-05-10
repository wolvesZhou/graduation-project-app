
"use strict"
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute ,browserHistory,withRouter,hashHistory } from 'react-router'
import Login from './components/Login'
import Register from './components/Register'

import injectTapEventPlugin from "react-tap-event-plugin";

import { AppContainer } from 'react-hot-loader';
import Routes from './Routes'

window.Q = Q;
window._ = _;


if(!window.$History){
    window.$History = browserHistory;
}


const winWidth = window.innerWidth;
var oneRem = (winWidth / 360) * 16;
if(oneRem > 24){
    oneRem = 24;
}
$("html").css("fontSize", oneRem);



render((
    <AppContainer>
        <Routes/>
    </AppContainer>
), document.getElementById('root'));


if (module.hot) {
    module.hot.accept('./Routes',function () {

        render((
            <AppContainer>
                <Routes/>
            </AppContainer>
        ), document.getElementById('root'));
    })

}