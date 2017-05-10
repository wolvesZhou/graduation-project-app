import React from 'react';
import IconDevice from 'material-ui/svg-icons/action/settings-applications';
import IconScene from 'material-ui/svg-icons/action/dashboard';
import IconConn from 'material-ui/svg-icons/action/swap-vertical-circle';
// import CONST from '../../../core/constValues'
// import Rebus from '../../../core/Rebus'
import {withRouter,Link} from 'react-router'
import CONST from '../../constant'
var _ = require('underscore')
 class UserInfo extends React.Component {
  static propTypes = {
    user: React.PropTypes.string
  }
  static defaultProps = {
    user: ''
  }
  constructor() {
    super();
    this.state = {
      data: {}
    };

  }
  componentDidMount() {

  }
  componentWillReceiveProps(props) {

  }
  logout(){
    //localStorage.removeItem('accessToken');
    // Rebus.execute({akey:CONST.ACTION.LOGOUT,from:''},{});
    // this.props.router.replace('/Login');
  }
  render() {
      var imgStyle = {
          margin:'auto'
      }

    return (
      <div className="react-git-card">
        
          <div className="avatar" style={{height:'200px'}}>
              <Link to="/Login">

                  <img className="react-git-card-avatar" src="src/plugins/img/toux.png" />

                </Link>
              <div className="user-info">
                  <h1 className="react-git-card-name">{CONST.user.uservalue.username}</h1>
                  <p className="react-git-card-desc">{CONST.user.telno}</p></div></div>
        
        <div className="react-git-card-social">
          <div className="react-git-card-item followers" >
              <IconDevice color="white"/>设备


          </div>
          <div className="react-git-card-item repos" >
              <IconScene color="white" /> 场景

					</div>
          <div className="react-git-card-item following" >
              <IconConn color="white"/> 连接

					</div>
        </div>
      </div>
    );
  }
}
export default withRouter(UserInfo)
