/**
 * Created by zwf on 17-4-17.
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

export default class extends React.Component {
    constructor(props) {

        super(props);

        this.updateHeight = this.updateHeight.bind(this);
        this.clickAction = this.clickAction.bind(this);
        const oneRem = parseFloat($("html").css("fontSize"));
        const footerHeight=oneRem*4;
        this.state = {

            clientHeight: 440,
            navHeight:64 ,
            FooterHeight:footerHeight,
            petValue:this.props.location.state.petValue
        };
    }


    clickAction() {
        this.refs.selector.openModal();
    }


    componentWillMount() {

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

    back(){
        browserHistory.push({pathname:'/Room',state:this.props.location.state.curShop})
    }

    handleOrder(){
        browserHistory.push({pathname:'/PetOrder',state:this.state.petValue})
    }

    render() {


        const cssHeight = {
            height: 100 + "%",
        }

        var headStyle = {
            background:'linear-gradient(#9ADEFF, #00b8fe)',
            height:'60px'

        }

        var height=(this.props.height || window.innerHeight) - this.state.navHeight
        var petValue = this.state.petValue;
        var toolbarStyle = {
            position:'fixed',
            bottom:0,
        };

        var faceStyle = {
            height:'56px',
            lineHeight:'56px',
            margin:'auto'
        }

        var groupStyle = {
            width:window.innerWidth-176+'px'
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

        return (
            <div>
                <div className="homePage">
                    <ReactHeight onHeightReady={this.updateHeight}>
                        <div className="headContainer">
                            <div className="leftLnk" onTouchTap={this.back.bind(this)}>
                                <span className="back"><img src="src/plugins/img/back.png" /></span>
                            </div>
                            <div className="title">
                                111
                            </div>
                            <div className="rightLnk"></div>
                        </div>
                    </ReactHeight>
                </div>
                <div style={{overflow:'auto'}}>
                    <div>
                        <img src={petValue.data.icon} style={{width:'100%'}}/>
                    </div>
                    <div>
                        <List>
                            <ListItem
                                primaryText={petValue.data.age+'岁'+petValue.data.sex+'的名字叫'+petValue.data.petname+'的'+petValue.data.variety}
                                //onTouchTap={this.handleLink.bind(this,'/DeviceEdit')}
                                key="petName"
                                rightIcon={<SocialShare/>}
                            />
                            <FlatButton label={'￥'+petValue.data.price} secondary={true} labelStyle={{fontSize:'24px'}}/>
                        </List>
                        <Divider/>
                    </div>
                    <div style={{backgroundColor:'#F9FBE7'}}>
                        <List>
                            <ListItem
                                primaryText="领取优惠券"
                                //secondaryText="发布求购信息"
                                leftIcon={<ActionGiftCard color="#F44336"/>}
                                //onTouchTap={this.handleLink.bind(this,'/SetConfig')}
                                key="ListItemSetConfig"
                                rightIcon={<ImageNavigateNext />}
                            />
                            <Divider/>
                            <ListItem
                                primaryText={'购买可得'+(parseInt(Math.random().toFixed(20)*100)+1)+'积分'}
                                //secondaryText="发布求购信息"
                                leftIcon={<ImageControlPoint color="#F44336"/>}
                                //onTouchTap={this.handleLink.bind(this,'/SetConfig')}
                                key="abc"
                                rightIcon={<ImageNavigateNext />}
                            />
                        </List>
                    </div>
                </div>

                <Toolbar style={toolbarStyle}>
                    <ToolbarGroup firstChild={true}>
                        <RaisedButton
                            label="客服"
                            //secondary={true}
                            style={faceStyle}
                            icon={<ActionFace/>}
                        />
                        <RaisedButton
                            label="收藏"
                            //secondary={true}
                            style={faceStyle}
                            icon={<ToggleStar/>}
                        />
                    </ToolbarGroup>
                    <ToolbarGroup style={groupStyle}>
                        <RaisedButton
                            label="加入购物车"
                            //secondary={true}
                            style={shopStyle}
                            backgroundColor="#FF9800"
                            labelColor="white"
                        />
                        <RaisedButton
                            label="立即购买"
                            //secondary={true}
                            style={buyStyle}
                            backgroundColor="#FB8C00"
                            labelColor="white"
                            onTouchTap={this.handleOrder.bind(this)}
                        />
                    </ToolbarGroup>
                </Toolbar>
            </div>

        )
    }
};