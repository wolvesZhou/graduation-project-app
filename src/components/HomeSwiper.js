"use strict"

import React  from 'react';
import _ from 'lodash';
import HomeGridLayout from './HomeLayout.js';
import { Swiper, Slide } from 'react-dynamic-swiper';

export default class extends React.Component {
    static defaultProps = {
        cols: {lg: 3, xs: 3, xxs: 3},
        swiperOptions: {
            navigation: false,
            pagination: true,
            scrollBar: false,
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            shopnames: this.props.shopnames,
            curShopValue: this.props.curShopValue,
        }
        // this.getFinalConfig()
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            curShopValue: nextProps.curShopValue,
            shopnames: nextProps.shopnames
        })
    }

    getData() {
        let groupList = this.state.curShopValue;
        let alllist = {}
        _.each(this.state.shopnames,function (value,index) {
            alllist[index]=[]
        })
        _.each(groupList,function (value,index) {
            if (_.has(this.state.shopnames,value.kind)){
                alllist[value.kind].push(value)
            }
        }.bind(this))
        return alllist;
    }

    getLayoutData(arr) {
        let _this = this;
        let col = this.props.cols.xxs;
        let data = arr;

        var x = 0, y = 0, xx = 0, yy = 0, x2 = 0, y2 = 0, key = -1;


        return _.map(data, function (l, i) {
            var state = _this.state;
            var option = {
                    space: 1,
                    height: 1
                }
            //获取元素的长和宽
            let w = option.space;
            let h = option.height;
            x = x2;
            y = y2;

            if (x + w > col) {
                x = 0;
                y = y + 1;
            }
            //获取上一个元素的右下角坐标
            let x0 = xx, y0 = yy;

            //获取元素的右下角坐标
            xx = x + w;
            yy = y + h;

            //计算得出下一个元素的坐标
            x2 = (xx == col) ? 0 : xx;
            y2 = (xx == col) ? (y + 1) : y;

            key = key + 1;

            return {
                x: x,
                y: y,
                w: w,
                h: h,
                i: key.toString(),
                name: l.petname,
                data: l,
                isDraggable: false,
                isResizable: false
            };
        })


    }


    setGroupId(swiper, event) {

    }

    render() {
        let data = this.getData();
        var petData = {}
        var finalConfig = {}
        _.each(data,function (value,key) {
            if (value.length>0){
                petData[key]=value
            }
        })
        _.each(petData,function (value,key) {
            finalConfig[key] = this.getLayoutData(value)
        }.bind(this))
        var swipValue = _.map(finalConfig, (value, i) => {
            if (value.length > 0) {
                return (
                    <Slide
                        className="Demo-swiper__slide"
                        style={{height: (window.innerHeight-140)+"px"}}
                        key={i}
                        >
                        <div
                            className="homeGridContent"
                            style={{height: (window.innerHeight-130)+"px"}}
                            >
                            <HomeGridLayout
                                layoutdata={value}
                                cols={this.props.cols}
                                rowHeight={this.props.height * .17}
                                curShop={this.props.curShop}
                                />
                        </div>
                        <span className="groupname">{i}</span>
                        <div className="homeLayoutBottomWamp"></div>
                    </Slide>
                )
            }
        });

        return (
            <Swiper
                swiperOptions={{slidesPerView: 'auto'}}
                {...this.props.swiperOptions}
                onSlideChangeEnd={(swiper, event) => this.setGroupId(swiper, event)}
                className="homeSwiperContainer"
                >
                {swipValue}
            </Swiper>
        )
    }
}
