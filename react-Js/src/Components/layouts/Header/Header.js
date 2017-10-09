import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Link} from 'react-router-dom';
import {white,black, blue500,grey900,grey200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import SwipeableViews from 'react-swipeable-views';
import Home from '../../../Containers/HomePage/Home'
import SalesForce from '../../../Containers/SalesForce/SalesForce'
import S3 from '../../../Containers/S3/S3'
import Eloqua from '../../../Containers/Eloqua/Eloqua'
import PropTypes from 'prop-types';
import axios from "axios";
import properties from '../../../Containers/Utils/const'
const styles = require('../../AppTheme').default;

class SubHeader extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange(value){
    this.setState({
      value: value,
    });
  }
  
  static contextTypes = {
    router: PropTypes.object
  }
  handleRegister(){
    axios.post(properties.renderSignUpUrl,JSON.stringify({username:localStorage.getItem('username')}),
      {
        headers:{
          "Content-Type":"application/json",
          "Authorization":localStorage.getItem('jwtToken'),
          }
      }).then((result)=>
      {
        if(result.data.allow){
           this.context.router.history.push('/register');
         }else{
          alert('you are not authorize to access this page')
         }
      }).catch((err)=>
      {  
         console.log(err)
      })
  } 
  handleSignOut(){
       localStorage.removeItem("userId");
       localStorage.removeItem("username");
       localStorage.removeItem("jwtToken");
       this.context.router.history.push('/login');
  }
  
 render() {
  var self=this;
     return (
     <div> 
       <AppBar
        title="Title"
        style={styles.barHeight}
        title={
          <Tabs value={self.state.value} onChange={self.handleChange.bind(self)}  
          inkBarStyle={styles.inkBarStyle} tabItemContainerStyle={{backgroundColor:grey900}}>
            <Tab label="Home" value={0} containerElement={<Link to='/home'/>}/>
            <Tab label="Source" value={1} containerElement={<Link to='/source'/>}/>
            <Tab label="Flat File" value={2} containerElement={<Link to='/zylotech'/>}/>
            <Tab label="Eloqua" value={3} containerElement={<Link to='/eloqua'/>}/>
          </Tabs>
         }

        iconElementRight={
           <IconMenu color={white}
                      iconButtonElement={
                        <IconButton ><MoreVertIcon color={white}/></IconButton>
                      }
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Sign out" onClick={self.handleSignOut.bind(self)}/>
              <MenuItem primaryText="Register" onClick={self.handleRegister.bind(self)}/>
            </IconMenu>
        }
      />
      {/*<SwipeableViews index={self.state.value}  onChangeIndex={self.handleChange.bind(self)}>
          <div><Home /></div>
          <div><SalesForce /></div>
          <div><S3 /></div>
          <div><Eloqua /></div>
      </SwipeableViews>*/}
     </div> 
      );
  }
}

export default SubHeader;