import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {grey500, white,red300} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom';
import AppTheme from '../AppTheme';
import {connect, ReactRedux} from 'react-redux';
import {bindActionCreators} from 'redux';
import {validateLoginData,addFlashMessage} from '../../Actions/Login/loginAction';


class LoginPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {username:'',password:''};
  }
   
  static contextTypes = {
    router: PropTypes.object
  }
 
  handleLogin(){ 
   var self=this; 
   var loginData={username:this.state.username,password:this.state.password};
    this.props.validateLoginData(loginData).then(function(resolve){
      if(resolve.status=="success"){
        localStorage.setItem("userId",self.props.login.data.userId);
        localStorage.setItem("username",self.props.login.data.username);
        self.context.router.history.push('/home');
      }else{
        self.props.addFlashMessage("Invalid User Id or Password!");
        self.context.router.history.push('/login');
      }
    })
    .catch(function(reject){
         alert(reject);
    })
  }

render(){
  let self = this;

  return (
    <MuiThemeProvider muiTheme={AppTheme}>
      <div>
        <div style={AppTheme.loginContainer}>
         <p style={{color:red300}}>{self.props.login.message}</p>
          <Paper style={AppTheme.Lpaper} zDepth={2}>

            <form>
              <TextField
                hintText="username"
                floatingLabelText="username"
                fullWidth={true}
                value={self.state.username}
                onChange={e => self.setState({ username: e.target.value })}
              />
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                fullWidth={true}
                type="password"
                value={self.state.password}
                onChange={e => self.setState({ password: e.target.value })}
              />

              <div>
                <Checkbox
                  label="Remember me"
                  style={AppTheme.checkRemember.style}
                  labelStyle={AppTheme.checkRemember.labelStyle}
                  iconStyle={AppTheme.checkRemember.iconStyle}
                />

                
                  <RaisedButton label="Login"
                      primary={true}
                      style={AppTheme.loginBtn} onClick={self.handleLogin.bind(self)}/>
                
              </div>
            </form>
          </Paper>

          {/*<div style={AppTheme.buttonsDiv}>
            <FlatButton
              label="Register"
              href="/"
              icon={<PersonAdd />}
            />

            <FlatButton
              label="Forgot Password?"
              href="/"
              icon={<Help />}
            />
          </div>

          <div style={AppTheme.buttonsDiv}>
            <Link to="/" style={{...AppTheme.btn, ...AppTheme.btnFacebook}}>
              <i className="fa fa-facebook fa-lg"/>
              <span style={AppTheme.btnSpan}>Log in with Facebook</span>
            </Link>
            <Link to="/" style={{...AppTheme.btn, ...AppTheme.btnGoogle}}>
              <i className="fa fa-google-plus fa-lg"/>
              <span style={AppTheme.btnSpan}>Log in with Google</span>
            </Link>
          </div>*/}
        </div>
      </div>
    </MuiThemeProvider>
  );
 }
};

function mapStatetoProps(store) {
    return {
      login: store.Login,
    }
};

function mapDispatchToProps(dispatch) {
 return bindActionCreators({validateLoginData,addFlashMessage}, dispatch);
 
}

export default connect(mapStatetoProps, mapDispatchToProps)(LoginPage);

