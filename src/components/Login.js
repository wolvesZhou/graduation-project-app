/**
 * Created by zwf on 17-4-13.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Link,browserHistory,} from 'react-router'
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ImageNavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Person from 'material-ui/svg-icons/social/person';
import YeeToast from './YeeToast'
import CONST from '../constant'

export default class extends React.Component{
    constructor(props){
        super(props)
    }

    // clickAction(){
    //     browserHistory.goBack();
    // }

    logIn(){
        let user = $(this.refs.phoneno).val();
        let password = $(this.refs.password).val();
        var url = 'http://localhost:4000/userInfo/checkuser?telno='+user+'&password='+password
        $.get(url,function (response) {
            //console.log('a')
            if (response.telno){
                CONST.user = response
                browserHistory.push('/Main')
            }
            else {
                this.refs.yeetoast.setNotification(response)
            }
        }.bind(this))

    }

    regist(type){
        browserHistory.push({pathname:'/Register',state:type})
    }

    componentDidMount(){
        $(this.refs.phoneno).inputmask({mask:'99999999999',placeholder: ''});
    }

    render() {
        return (
            <div className="LoginContent" style={{height:window.innerHeight+"px"}}>
                <div className="LoginPage">
                    <div className="LoginForm">
                        <div className="regli">
                            <span>手机号</span>
                            <input ref="phoneno" placeholder="请输入你的手机号" />
                        </div>
                        <div className="regli">
                            <span>密码</span>
                            <input ref="password" type="password" placeholder="输入密码" />
                        </div>
                        <div className="regli submitBtn loginSubBtn">
                            <a className="loginBtn" onTouchTap={this.logIn.bind(this)}>登录</a>
                        </div>
                        <div className="regli submitLnk">
                            <a className="reglnk" onTouchTap={this.regist.bind(this,'register')}>注册账号</a>
                            <a className="reglnk" onTouchTap={this.regist.bind(this,'forget')}>忘记密码</a>
                        </div>
                    </div>
                </div>
                <YeeToast ref="yeetoast"/>
            </div>
        );
    }
};