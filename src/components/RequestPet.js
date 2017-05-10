/**
 * Created by zwf on 17-4-19.
 */

import React from 'react';
import _ from 'lodash';
import {Link,browserHistory} from 'react-router';
import SwiperComponent from './HomeSwiper.js';
import ReactHeight from 'react-height'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Footer from './Footer'
import Home from 'material-ui/svg-icons/action/home';
import ImageNavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CONST from '../constant'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false
        }

    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    componentDidUpdate(){
        // var canShow = this.props.location&&this.props.location.state;
        // if (canShow){
        //     this.refs.setPatternPage.show();
        // }
    }

    setGroupId (id){
        // this.setState({
        //     groupId:id,
        //     hasSwip:true
        // });
    }

    setHomeLayOut(homeConfig,option){
        // this.setState({
        //     homeConfig:homeConfig,
        //     option:option
        // })
    }



    FooterHeight(height){
        this.setState({FooterHeight:height || 64})
    }

    clickAction(){
        browserHistory.push('/Main')
    }

    back(){
        browserHistory.push('/UserInfo')
    }

    handleRequest(){
        var requestValue= $(this.refs.textvalue).val();
        var telno = CONST.user.telno;
        var username = CONST.user.uservalue.username

        var postData = {
            request:requestValue,
            telno:telno,
            username:username
        }

        $.post('http://localhost:4000/request/petask',postData)
            .done(function (data) {
                this.setState({
                    open:true
                })

            }.bind(this))
            .fail(function(data) {

            })

    }

    handleClose(){
        $(this.refs.textvalue).val('');
        this.setState({
            open:false
        })
    }

    render() {
        // var curHouseId = Rebus.getState(CONST.STATE.CUR_HOUSE);
        // var allHouses = Rebus.getState(CONST.STATE.HOUSES);
        // var curHouse = _.find(allHouses, function (house) {
        //     return house.uuid === curHouseId;
        // })
        var textareaStyle = {
            width:'100%',
            minHeight:'300px',
            marginTop:'10px'
        }

        const actions = [
            <FlatButton
                label="确定"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />
        ];

        return (
            <div>
                <div className="homePage">
                    <div className="headContainer">
                        <div className="leftLnk" onTouchTap={this.back.bind(this)}>
                            <span className="back"><img src="src/plugins/img/back.png" /></span>
                        </div>
                        <div className="title">
                        </div>
                        <div className="rightLnk"></div>
                    </div>
                </div>
                <Card>
                    <CardHeader
                        title={CONST.user.uservalue.username}
                        subtitle={CONST.user.telno}
                        avatar="src/plugins/img/toux.png"
                    />
                    <CardTitle
                        title="发布求购信息"
                        //subtitle="Card subtitle"
                        //children={<input/>}
                    />
                    <CardText>
                        <textarea style={textareaStyle} ref="textvalue"/>
                    </CardText>
                    <CardActions style={{backgroundColor:'#FAFAFA'}}>
                        <FlatButton label="取消" className="RequestButton" onTouchTap={this.back.bind(this)}/>
                        <FlatButton label="确定" className="RequestButton" onTouchTap={this.handleRequest.bind(this)}/>
                    </CardActions>
                </Card>
                <Dialog
                    title="求购信息"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    你的求购信息已成功提交
                </Dialog>
            </div>
        )
    }

}