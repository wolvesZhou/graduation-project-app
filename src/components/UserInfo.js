/**
 * Created by zwf on 17-4-17.
 */

import React from 'react'
import UserInfo from '../plugins/lib/Component.jsx';
import IconOneKey from 'material-ui/svg-icons/action/touch-app';
import IconShare from 'material-ui/svg-icons/social/share';
import IconDevice from 'material-ui/svg-icons/hardware/developer-board';
import IconWe from 'material-ui/svg-icons/action/supervisor-account';
import ReactHeight from 'react-height'
import {Link,browserHistory} from 'react-router'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ImageNavigateNext from 'material-ui/svg-icons/image/navigate-next';
import ImageNavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import Footer from './Footer'
import FlatButton from 'material-ui/FlatButton';

export default class extends React.Component{
    constructor(props){
        super(props);
        this.updateHeight = this.updateHeight.bind(this);
        this.FooterHeight = this.FooterHeight.bind(this);
        var curShop = this.props.location.state
        this.state = {
            contentHeight:576,
            curShop:curShop
        }
    }
    clickAction(){
        browserHistory.push('/Main');
    }

    handleLink(url){
        browserHistory.push(url)
    }

    logout() {
        // localStorage.removeItem('accessToken');
        // Rebus.execute({akey:CONST.ACTION.LOGOUT,from:''},{message:'你已退出登录'});
        browserHistory.push('/Login');
    }

    updateHeight(height){
        this.setState({navHeight: height || 60});
    }
    FooterHeight(height){
        this.setState({FooterHeight:height || 64})
    }
    render(){
        const cssHeight ={
            height:(this.props.height || window.innerHeight) - this.state.navHeight - this.state.FooterHeight+"px",
            //overflowY:"scroll",
        }

        const infoStyle= {
            height :(this.props.height || window.innerHeight) - this.state.navHeight - this.state.FooterHeight - 245+"px",
            overflowY:"scroll",
        }

        // const houseLayout = Rebus.getState(CONST.STATE.HOUSELAYOUT);
        var listItems = [];
        listItems.push(<Subheader inset={true} style={{fontSize:'16px'}} key="subCon">管理</Subheader>);
        listItems.push(<Divider key="condivider"/>);


        listItems.push(<ListItem
            primaryText="发布求购"
            secondaryText="发布求购信息"
            leftIcon={<IconOneKey color="rgb(250, 179, 27)" />}
            onTouchTap={this.handleLink.bind(this,'/RequestPet')}
            key="ListItemSetConfig"
            rightIcon={<ImageNavigateNext />}
        />);
        listItems.push(
            <Divider key="setdivider"/>
        )
        listItems.push(<ListItem
            leftIcon={<IconDevice color="rgb(250, 179, 27)"  />}
            primaryText="用户反馈"
            secondaryText="提出反馈意见"
            onTouchTap={this.handleLink.bind(this,'/UserBack')}
            key="ListItemDeviceEdit"
            rightIcon={<ImageNavigateNext />}
        />)
        listItems.push(
            <Divider key="devdivider"/>
        )
        // listItems.push(<List.Item
        //     linkComponent={Link}
        //     linkProps={{to:'/Share'}}
        //     media={<IconShare color="rgb(250, 179, 27)"  />}
        //     title="设备分享"
        //     subTitle="将控制功能分享给家人"
        // />)
        var headStyle = {
            background:'linear-gradient(#9ADEFF, #00b8fe)',
            height:'60px'

        }

        return (
            <div id="app-index">
                <ReactHeight onHeightReady={this.updateHeight}>
                    <AppBar
                        title={this.state.curShop&&this.state.curShop.shopname}
                        //onLeftIconButtonTouchTap={this.clickAction}
                        iconElementLeft={<IconButton onClick={this.clickAction}><ImageNavigateBefore/></IconButton>}
                        iconElementRight={<FlatButton label="注销" onTouchTap={this.logout.bind(this)}/>}
                        iconStyleRight={{marginTop:'5px'}}
                        style={headStyle}
                        titleStyle={{lineHeight:'60px',height:'60px'}}
                    />
                </ReactHeight>
                <div style={cssHeight}>
                    <div style={cssHeight} >
                        <div
                            className="zoom-content"
                        >
                            <UserInfo avatar_url="data"/>
                        </div>
                        <div style={infoStyle}>
                            <div
                                className="zoom-content"
                            >
                                <List key="ListSet">
                                    {listItems}
                                </List>
                            </div>
                            <div
                                className="zoom-content"
                            >
                                <List key="ListAbout">
                                    <ListItem
                                        leftIcon={<IconWe color="rgb(250, 179, 27)"/>}
                                        //secondaryText={CONST.title}
                                        primaryText="关于我们"
                                        key="ListItemAbout"
                                    />
                                </List>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactHeight onHeightReady={this.FooterHeight}>
                    <Footer selectIndex="2" curShop={this.state.curShop}/>
                </ReactHeight>
            </div>
        )
    }
}