/**
 * Created by zwf on 17-4-13.
 */

import React from 'react'
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import CONST from '../constant'

export default class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
        };
    }

    openModal() {
        this.setState({
            isModalOpen: true,
        })
    }

    closeModal() {
        this.setState({
            isModalOpen: false,
        });
    }

    handleItemClick(house) {
        CONST.curShop = house
        this.closeModal()

    }

    componentWillReceiveProps(nextProps){
        // this.setState({
        //
        // })
    }

    render() {
        var that = this;
        const style={
            backgroundColor:'#BBDEFB'

        }
        var houseList = [];

        _.map(this.props.petshops, function (house, index) {
            houseList.push(<ListItem style={ house.shopname === that.props.curshop.shopname?style:{}}
                                     key={index} onTouchTap={that.handleItemClick.bind(that,house)}>
                {house.shopname || "项目"} </ListItem>)
            houseList.push(<Divider key={'divider'+index}/>)
        })
        return (
            <Drawer
                docked={false}
                width={200}
                open={this.state.isModalOpen}
                onRequestChange={(isModalOpen) => this.setState({isModalOpen})}
            >
                <div className="modal-actions-group warning">
                    <List>
                        <ListItem
                            disabled={true}
                            leftAvatar={
                                <Avatar src="src/plugins/img/userdefault.png" />
                            }
                            style={{height:'60px'}}
                        >
                        </ListItem>
                        <Divider key='dividertitle'/>
                        <Subheader>选择项目</Subheader>
                        {houseList}
                    </List>
                </div>
            </Drawer>

        );
    }
}