/**
 * Created by zwf on 17-4-13.
 */

"use strict"
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
import CONST from '../constant'

export default class extends React.Component {
    constructor(props) {

        super(props);

        this.updateHeight = this.updateHeight.bind(this);
        this.FooterHeight = this.FooterHeight.bind(this);
        this.clickAction = this.clickAction.bind(this);
        const oneRem = parseFloat($("html").css("fontSize"));
        const footerHeight=oneRem*4;
        this.state = {

            clientHeight: 440,
            navHeight:64 ,
            FooterHeight:footerHeight,
            sizeChange:false,
            allshop:[],
            curShop:''
        };
    }


    clickAction() {
        this.refs.selector.openModal();
    }


    componentWillMount() {
        var url = 'http://localhost:4000/petShop/shopname';
        $.get(url,function (response) {
            CONST.curShop = response.rows[0]
            this.setState({
                allshop:response.rows,
                curShop:response.rows[0]
            })
        }.bind(this))

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

    FooterHeight(height){
        this.setState({FooterHeight:height || 64})
    }
    render() {

        var curShop =  CONST.curShop

        const cssHeight = {
            height: 100 + "%",
        }

        var headStyle = {
            background:'linear-gradient(#9ADEFF, #00b8fe)',
            height:'60px'

        }

        var height=(this.props.height || window.innerHeight) - this.state.navHeight - this.state.FooterHeight;

        return (
            <Paper id="app-index">
                <ReactHeight onHeightReady={this.updateHeight}>
                    <AppBar
                        title={curShop&& curShop.shopname}
                        onTitleTouchTap={this.clickAction.bind(this)}
                        iconElementLeft={<IconButton><Home/></IconButton>}
                        onLeftIconButtonTouchTap={this.clickAction}
                        style={headStyle}
                        titleStyle={{lineHeight:'60px',height:'60px'}}
                    />
                </ReactHeight>
                <Paper>
                    <div className="zoom-content" style={{height:height}}>
                        <img src="src/plugins/img/logo1.jpg" style={{height:'100%',width:'100%'}}/>
                    </div>
                    <DrawerSelector ref="selector" petshops={this.state.allshop} curshop={curShop} changePetShop={this.changePetShop.bind(this)}/>
                </Paper>
                <ReactHeight onHeightReady={this.FooterHeight}>
                    <Footer selectIndex="0" curShop={curShop}/>
                </ReactHeight>
            </Paper>

        )
    }
};