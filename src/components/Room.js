/**
 * Created by zwf on 17-4-14.
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
import CONST from '../constant'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.updateHeight = this.updateHeight.bind(this);
        this.FooterHeight = this.FooterHeight.bind(this);
        var curShop = CONST.curShop
        this.state = {
            curShop : curShop,
            curShopValue:''
        };

    }

    componentWillMount(){
        var curShop = this.state.curShop;
        var url = 'http://localhost:4000/petShop/curshop?shopname='+curShop.shopname;
        $.get(url,function (response) {
            this.setState({
                curShopValue:response
            })
        }.bind(this))

        var kindurl = 'http://localhost:4000/kindInfo/kindlist'
        $.get(kindurl,function (response) {
            var kindList = response.rows;
            var shopnames = {};
            _.each(kindList,function (value,key) {
                shopnames[value.kindname] = value
            })
            this.setState({
                shopnames:shopnames
            })
        }.bind(this))
    }

    componentDidMount(){

    }

    componentDidUpdate(){

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

    FooterHeight(height){
        this.setState({FooterHeight:height || 64})
    }

    clickAction(){
        browserHistory.push('/Main')
    }

    render() {

        var headStyle = {
            background:'linear-gradient(#9ADEFF, #00b8fe)',
            height:'60px'

        }

        var swiperStyle = {
            height:window.innerHeight-(this.state.FooterHeight||64)+'px'
        }

        return (
            <div className="homePage" style={swiperStyle}>
                <ReactHeight onHeightReady={this.updateHeight}>
                    <AppBar
                        title={this.state.curShop&& this.state.curShop.shopname}
                        iconElementLeft={<IconButton><ImageNavigateBefore/></IconButton>}
                        onLeftIconButtonTouchTap={this.clickAction.bind(this)}
                        style={headStyle}
                        titleStyle={{lineHeight:'60px',height:'60px'}}
                    />
                </ReactHeight>
                <SwiperComponent
                    height={this.props.height}
                    curShopValue={this.state.curShopValue}
                    shopnames={this.state.shopnames}
                    curShop={this.state.curShop}
                    ref = 'swiperComp'
                />
                <ReactHeight onHeightReady={this.FooterHeight}>
                    <Footer selectIndex="1" curShop={this.state.curShop}/>
                </ReactHeight>
            </div>)
    }

}