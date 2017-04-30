/**
 * Created by fx on 16-4-29.
 */
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


// document.addEventListener('focusout',function (e) {
//     window.scrollTo(0,document.body.scrollHeight)
//     console.log('111')
// })


// class PageNotFound extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>Page Not Found.</h1>
//                 <p>Go to </p>
//             </div>
//         )
//     }
// }


// render(<ModalLoading />, document.getElementById('loading'));
// render(<YeeToast />, document.getElementById('toast'));

//解决firefox中polymer加载没有完成的问题

// setTimeout(function () {
//     render((
//         <AppContainer>
//             <Routes/>
//         </AppContainer>
//     ), document.getElementById('root'));
// },2000);



// window.addEventListener('onchange',function () {
//     if (window.isFinished){
//
// })

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