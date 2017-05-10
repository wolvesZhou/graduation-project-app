/**
 * Created by Administrator on 2016/7/7.
 */

import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class extends React.Component{
    constructor(props){
        super(props);
        this.state={visible:false,message:null}
    }

    componentDidMount(){
        // var that = this;
        // Rebus.connect(CONST.ACTION.ERROR,function(notification){
        //     that.setNotification(notification.message)
        // })
        //
        // Rebus.connect(CONST.ACTION.MESSAGE,function(notification){
        //     that.setNotification(notification.message)
        // })
    }
    setNotification(notification){
        var that = this;
        if(this.timeHandle){
            clearTimeout(this.timeHandle);
        }
        this.timeHandle = setTimeout(function(){
            that.closeNotification();
            that.timeHandle = null;
        },3000);
        this.setState({visible:true,message:notification});
    }
    closeNotification(){
        this.setState({visible:false})
    }
    render(){
        return (

            <Snackbar
                    open={this.state.visible}
                    onRequestClose={this.closeNotification.bind(this)}
                    message={this.state.message || ''}
                    contentStyle={{fontSize:'24px',textAlign:'center'}}
                >
            </Snackbar>

                )
    }
}
