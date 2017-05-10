/**
 * Created by zwf on 17-4-21.
 */


import React from 'react';
import {Link,browserHistory} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import DrawerSelector from './DrawerSelector'
import uuid from 'node-uuid'
import ReactHeight from 'react-height'
import Footer from './Footer'
import Home from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import SocialShare from 'material-ui/svg-icons/social/share';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFace from 'material-ui/svg-icons/action/face';
import ToggleStar from 'material-ui/svg-icons/toggle/star'
import FontIcon from 'material-ui/FontIcon';
import ImageNavigateNext from 'material-ui/svg-icons/image/navigate-next';
import ActionGiftCard from 'material-ui/svg-icons/action/card-giftcard'
import Divider from 'material-ui/Divider';
import ImageControlPoint from 'material-ui/svg-icons/image/control-point'
import TextField from 'material-ui/TextField';
import YeeToast from './YeeToast'
import CONST from '../constant'


export default class extends React.Component {
    constructor(props) {

        super(props);

        this.updateHeight = this.updateHeight.bind(this);
        this.clickAction = this.clickAction.bind(this);
        const oneRem = parseFloat($("html").css("fontSize"));
        const footerHeight=oneRem*4;

        this.state = {

            // curHouseId: Rebus.getState(CONST.STATE.CUR_HOUSE),
            clientHeight: 440,
            navHeight:64 ,
            FooterHeight:footerHeight,
            petvalue:this.props.location.state,
            canSubmit:false
        };
    }


    clickAction() {
        this.refs.selector.openModal();
    }


    componentDidMount() {
        $(this.refs.user.input).blur(function (e) {
            if ($(this.refs.user.input).val().length==0){
                //console.log(111)
                this.refs.yeetoast.setNotification('请输入收货人姓名')
                this.setState({
                    canSubmit:false
                })
            }
            else {
                this.setState({
                    canSubmit:true
                })
            }
        }.bind(this))
        $(this.refs.telno.input).blur(function (e) {
            if ($(this.refs.telno.input).val().length==0){
                //console.log(111)

                this.refs.yeetoast.setNotification('请输入手机号码')


                this.setState({
                    canSubmit:false
                })
            }
            else {
                if ($(this.refs.telno.input).val().length!=11){
                    this.refs.yeetoast.setNotification('手机号码格式不对')
                    this.setState({
                        canSubmit:false
                    })
                }
                else {
                    this.setState({
                        canSubmit:true
                    })
                }

            }
        }.bind(this))
        $(this.refs.address.input).blur(function (e) {
            if ($(this.refs.address.input).val().length==0){
                //console.log(111)
                this.refs.yeetoast.setNotification('请输入收货人地址')
                this.setState({
                    canSubmit:false
                })
            }
            else {
                this.setState({
                    canSubmit:true
                })
            }
        }.bind(this))
        $(this.refs.message.input).blur(function (e) {

        })
    }

    changePetShop(house){
        this.setState({
            curShop:house
        })
    }

    updateHeight(height) {
        const oneRem = parseFloat($("html").css("fontSize"));
        const footerHeight=oneRem*4;
        var clientHeight = (this.props.height|| window.innerHeight)  - height-footerHeight;
        this.setState({
            navHeight: height || 64,
            clientHeight:clientHeight
        });
    }

    back(e){
        e.preventDefault();
        browserHistory.push({pathname:'/PetInfo',state:{petValue:this.state.petvalue}})
    }

    handleOrder(){
        var url = 'http://localhost:4000/petOrder/orderlist';
        var postData = {
            orderUser:CONST.user.uservalue.username,
            orderTel:CONST.user.telno,
            receiveUser:$(this.refs.user.input).val(),
            receiveTel:$(this.refs.telno.input).val(),
            address:$(this.refs.address.input).val(),
            message:$(this.refs.message.input).val(),
            petName:this.state.petvalue.data.petname,
            petFrom:CONST.curShop.shopname,
            petPrice:this.state.petvalue.data.price
        }

        $.post(url,postData)
            .done(function (data) {
                this.setState({
                    open:true
                })

            }.bind(this))
            .fail(function(data) {

            })
    }

    getPoint(){

    }

    render() {


        // var curHouse = _.find(allHouses, function (house) {
        //     return house.uuid === cur_id;
        // })
        var canSubmit = this.state.canSubmit

        if (this.refs.user){
            if ($(this.refs.user.input).val().length==0 || $(this.refs.telno.input).val().length==0 || $(this.refs.address.input).val().length==0){
                canSubmit = false
            }
        }

        const cssHeight = {
            height: 100 + "%",
        }

        const style = {
            marginLeft: 20,
        };

        var headStyle = {
            background:'linear-gradient(#9ADEFF, #00b8fe)',
            height:'60px'

        }

        var height=(this.props.height || window.innerHeight) - this.state.navHeight
        // var accessToken = Rebus.getState(CONST.STATE.ACCESSTOKEN);

        var toolbarStyle = {
            position:'fixed',
            bottom:0,
            width:window.innerWidth
        };

        var groupStyle = {
            width:window.innerWidth-176+'px',
            position:'fixed',
            right:0
        }

        var shopStyle = {
            height:'56px',
            lineHeight:'56px',
            width:'56%',
            margin:0,
            backgroundColor:'#FF9800'
        }

        var buyStyle = {
            height:'56px',
            lineHeight:'56px',
            width:'44%',
            margin:0,
            backgroundColor:'#FB8C00'
        }

        var petValue = this.state.petvalue;

        return (
            <div>
                <div className="homePage">
                    <ReactHeight onHeightReady={this.updateHeight}>
                        <div className="headContainer">
                            <div className="leftLnk" onTouchTap={this.back.bind(this)}>
                                <span className="back"><img src="src/plugins/img/back.png" /></span>
                            </div>
                            <div className="title">
                                订单详情
                            </div>
                            <div className="rightLnk"></div>
                        </div>
                    </ReactHeight>
                </div>
                <div style={{display:'flex',backgroundColor:'#FAFAFA'}}>
                    <div style={{width:'30%'}}>
                        <img src={petValue.data.icon} style={{width:'90%',padding:'5px'}}/>
                    </div>
                    <div style={{width:'60%'}}>
                        <section style={{flex:1,fontSize:'20px',textAlign:'center'}}>
                            {petValue.data.petname}
                        </section>
                        <section style={{flex:2,fontSize:'20px',textAlign:'center'}}>
                            {petValue.data.variety}
                        </section>
                        <section style={{flex:1,fontSize:'20px',textAlign:'center'}}>
                            <span>{'￥'+petValue.data.price}</span>
                            <span style={{marginLeft:'20%'}}>x1</span>
                        </section>
                    </div>
                </div>
                <div style={{overflow:'auto'}}>

                    <TextField hintText="收货人" style={style} underlineShow={false} ref="user"/>
                    <Divider />
                    <TextField hintText="手机号码" style={style} underlineShow={false} ref="telno"/>
                    <Divider />
                    <TextField hintText="运货地址" style={style} underlineShow={false} ref="address"/>
                    <Divider />
                    <TextField hintText="买家留言" style={style} underlineShow={false} ref="message"/>
                    <Divider />
                </div>
                <Toolbar style={toolbarStyle}>
                    <ToolbarGroup style={groupStyle}>
                        <span>价格：￥2000</span>
                        <RaisedButton
                            label="提交订单"
                            //secondary={true}
                            style={buyStyle}
                            backgroundColor="#FB8C00"
                            labelColor="white"
                            onTouchTap={canSubmit?this.handleOrder.bind(this):this.getPoint.bind(this)}
                        />
                    </ToolbarGroup>
                </Toolbar>
                <YeeToast ref="yeetoast"/>
            </div>

        )
    }
};