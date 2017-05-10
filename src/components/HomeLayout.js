"use strict"
import React from 'react';
import _ from 'lodash';
import {Responsive, WidthProvider} from 'react-grid-layout';
var ReactGridLayout = require('react-grid-layout');
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import {Link,browserHistory} from 'react-router';

export default class HomeGridLayout extends React.Component {

    static propTypes = {
        onLayoutChange: React.PropTypes.func.isRequired,
    };

    static defaultProps = {
        className: "layout",
        onLayoutChange: function(){}
    };

    state = {
        mounted: true,
        layouts: {lg: this.props.layoutdata},
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            layouts :{lg:nextProps.layoutdata}
        })
    }

    componentDidMount() {
        this.setState({mounted: false});

        // _.map(this.state.layouts.lg,function (value,key) {
        //     this.refs['comp'+value.data.devId+key].loadFile()
        // }.bind(this))

    }

    goToPetInfo(value){
        browserHistory.push({pathname:'/PetInfo',state:{petValue:value,curShop:this.props.curShop}})
    }

    generateDOM() {
        //let accessToken = encodeURIComponent(Rebus.getState(CONST.STATE.ACCESSTOKEN))||'';
        //let houseid = this.props.houseid;
        return _.map(this.state.layouts.lg, function (value, i) {
            //var valueData = value.data;
            //var sceneid = value.type=="devs"?valueData.devId:valueData.sceneId;
            let classname = value.static?'static patternDeviceLi':'patternDeviceLi';
            let selstyle = value.seled?' sel':'';
            classname = classname + selstyle;
            return (
                <div key={i} className={classname}>
                    <img src={value.data.icon} onClick={this.goToPetInfo.bind(this,value)}/>
                    <span>{value.name}</span>
                </div>);
        }.bind(this));
    }

    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
    }

    ItemCallback = (layout, oldItem, newItem, placeholder, e, element) =>{
        console.log(placeholder)
    }

    render() {
        var s = this.generateDOM();
        return (
            <ResponsiveReactGridLayout
                {...this.props}
                layouts={this.state.layouts}
                onLayoutChange={this.onLayoutChange}
                onDragStart={this.ItemCallback}
                useCSSTransforms={this.state.mounted}
                className="homeLayoutContainer">
                {this.generateDOM()}
            </ResponsiveReactGridLayout>
        )
    }
}