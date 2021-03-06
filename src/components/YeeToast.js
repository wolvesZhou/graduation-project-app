/**
 * Created by zwf on 17-4-17.
 */

import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class extends React.Component{
    constructor(props){
        super(props);
        this.state={visible:false,message:null}
    }

    componentDidMount(){

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
