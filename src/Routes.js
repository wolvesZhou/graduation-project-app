/**
 * Created by Administrator on 2016/11/3.
 */

"use strict"
import React, { Component } from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute ,browserHistory,withRouter,hashHistory } from 'react-router'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from './components/Login'
import Register from './components/Register'
import Main from './components/Main'
import Room from './components/Room'
import UserInfo from './components/UserInfo'
import PetInfo from './components/PetInfo'
import RequestPet from './components/RequestPet'
import UserBack from './components/UserBack'
import PetOrder from './components/PetOrder'


var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();



class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            totalHeight:576
        }
    }
    componentDidMount(){


    }
    render() {

        const {Header, Footer, Content} = this.props;

        var clientHeight = window.innerHeight;

        var oneRem = parseFloat($("html").css("fontSize"));
        if(oneRem > 24){
            oneRem = 24;
        }


        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div id="sk-container">
                    {Content}
                </div>
            </MuiThemeProvider>
        );
    }
};

export default class extends Component{


    render(){
        return(
            <Router history={browserHistory}>
                <Route path="/" component={App} >
                    <IndexRoute components={{Content:Login}}/>
                    <Route path="Login" components={{Content:Login}} />
                    <Route path="Register" components={{Content:Register}} />

                    <Route path="Main" components={{Content:Main}} />
                    <Route path="Room" components={{Content:Room}} />
                    <Route path="UserInfo" components={{Content:UserInfo}} />
                    <Route path="PetInfo" components={{Content:PetInfo}} />
                    <Route path="RequestPet" components={{Content:RequestPet}} />
                    <Route path="UserBack" components={{Content:UserBack}} />
                    <Route path="PetOrder" components={{Content:PetOrder}} />
                </Route>
            </Router>
        )
    }
}