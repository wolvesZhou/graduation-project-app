/**
 * Created by zwf on 17-4-13.
 */

import React,{Component} from 'react'
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import { Router, Route, IndexRoute ,browserHistory,withRouter,hashHistory } from 'react-router'
import Paper from 'material-ui/Paper';
import Home from 'material-ui/svg-icons/action/home';
import Room from 'material-ui/svg-icons/action/room';
import Code from 'material-ui/svg-icons/action/code';
import Person from 'material-ui/svg-icons/social/person';

export default class extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: props.selectIndex || 0,
            curShop:this.props.curShop
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            curShop:nextProps.curShop
        })
    }

    handleActive(url){

        browserHistory.push({pathname:url,state:this.state.curShop})
    }

    render(){
        const style={
            //backgroundColor:'#CFD8DC',
            height:'4rem'
        }
        const footStyle={
            position:'fixed',
            bottom:'0px',
            width:'100%'
        }
        var selectIndex=parseInt(this.state.selectedIndex)

        return(<Paper zDepth={5} style={footStyle}>
                <BottomNavigation selectedIndex={selectIndex} style={style}>
                    <BottomNavigationItem
                        label="首页"
                        icon={<Home style={{height: '36px'}}/>}
                        onClick={this.handleActive.bind(this,'/Main')}
                    />
                    <BottomNavigationItem
                        label="宠物"
                        icon={<Room style={{height: '36px'}}/>}
                        onClick={this.handleActive.bind(this,'/Room')}
                    />
                    <BottomNavigationItem
                        label="我的"
                        icon={<Person style={{height: '36px'}}/>}
                        onClick={this.handleActive.bind(this,'/UserInfo')}
                    />
                </BottomNavigation>
            </Paper>
        )
    }
}