/**
 * Created by zwf on 17-4-13.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Link,browserHistory,history} from 'react-router'
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ImageNavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import FlatButton from 'material-ui/FlatButton';

export default class extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            yanzhenBtnClass : "yanzhenBtn",
            reptchaValue : '',
            telNo:''
        }
    }

    register(){

    }

    clickAction(){
        browserHistory.push('/Login');
    }

    clickBack(){
        browserHistory.goBack();
    }

    reset(){
        $(this.refs.telNo).val('');
        $(this.refs.reptcha).val('');
        $(this.refs.code).val('');
        $(this.refs.psw1).val('');
        $(this.refs.psw2).val('');
        this.getReptcha();
    }
    getReptcha(){

    }

    getCode(){

    }

    changeReptcha(e){
        //console.log(e.target.value)
        this.setState({
            reptchaValue:e.target.value
        })
    }

    changeTelNo(e){
        this.setState({
            telNo:e.target.value
        })
    }

    getErrorMes(){
    }

    componentDidMount(){
        this.getReptcha();
    }
    render() {
        const style = {
            height:  window.innerHeight + 'px',
        };

        var type = this.props.location.state;

        var isMatchTel = (this.state.telNo.length==11);
        var isMatchRet = (this.state.reptchaValue.length==6);

        return (

            <div className="RegisterContent" style={style}>
                <div className="registerPage">
                    <div className="back"><a onTouchTap={this.clickBack}>返回</a></div>
                    <div className="registerForm">
                        <div className="regli">
                            <span>手机号</span>
                            <input ref="telNo" placeholder="输入你的手机号" onChange={this.changeTelNo.bind(this)}/>
                        </div>
                        <div className="regli yanzhen">
                            <input ref="reptcha" placeholder="输入图中数字" onChange={this.changeReptcha.bind(this)}/>
                            <img ref="reptchaPic" onClick={this.getReptcha.bind(this)}/>
                        </div>
                        <div className="regli">
                            <span>验证码</span>
                            <input ref="code" placeholder="输入验证码" />
                            <input type="button" onClick={isMatchTel&&isMatchRet?this.getCode.bind(this):this.getErrorMes.bind(this)} ref="getCode" className={this.state.yanzhenBtnClass} value="验证"/>
                        </div>
                        <div className="regli">
                            <span>密码</span>
                            <input type="password" ref="psw1" placeholder="设置登录密码" />
                        </div>
                        <div className="regli">
                            <span>密码</span>
                            <input type="password" ref="psw2" placeholder="再次输入密码" />
                        </div>
                        <div className="regli submitBtn">
                            <a className="subbtn" onTouchTap={this.register.bind(this)}>{type=='register'?'注册':'修改密码'}</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
