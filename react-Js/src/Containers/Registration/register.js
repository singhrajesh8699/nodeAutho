import React from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {connect, ReactRedux} from 'react-redux';
import {bindActionCreators} from 'redux';
import {registerData,sendRegistrationData,validateUserName,validateEmail} from '../../Actions/Registration/registrationAction';
import { ScaleLoader } from 'react-spinners';
import {red300} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import { Scrollbars } from 'react-custom-scrollbars';


const styles = require('../AppTheme').default;

class Register extends React.Component{

  constructor(props) {
    super(props);
    this.state = {name:"",username:"",password:"",confirmpwd:"",email:"",
    insert:false,showLoading:false,uniquser:true,uniqemail:true,value:'client'};
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleUserName=this.handleUserName.bind(this);
    this.handleEmail=this.handleEmail.bind(this);
  }
  componentDidMount(){
    if(this.props.register.data!=null){
      this.setState({name:this.props.register.data.name,
         username:this.props.register.data.username,
         password:this.props.register.data.password,
         confirmpwd:this.props.register.data.confirmpwd,
         email:this.props.register.data.email,
              })
    }
  } 
  componentWillReceiveProps(nextProps){
    if(nextProps.register.data){
      this.setState({name:nextProps.register.data.name,
         username:nextProps.register.data.username,
         password:nextProps.register.data.password,
         confirmpwd:nextProps.register.data.confirmpwd,
         email:nextProps.register.data.email,
              })
    }
  } 

  handleOnClick(){
  	var name =this.refs.CNm.getValue();
  	var username=this.refs.UNm.getValue();
  	var password=this.refs.Pwd.getValue();
  	var confirmpwd=this.refs.Cpwd.getValue();
    var email=this.refs.Email.getValue();
    this.setState({name:name,
    	             username:username,
    	             password:password,
                   confirmpwd:confirmpwd,
                   email:email,
    	            },function(){
    	            	this.props.registerData(this.state);
    	            }); 
	}

  handleUserName(){
   if(this.state.username){
     this.props.validateUserName(this.state);
   }
  }

  handleEmail(){
   if(this.state.email){
    this.props.validateEmail(this.state);
   } 
  }
   
   handleSelectChange = (event, index, value) => {
    this.setState({value:value});
  }

   handleOnSubmit(){
    if(this.props.register.data.uniquser && this.props.register.data.uniqemail){
      this.setState({showLoading:true})
      this.props.sendRegistrationData(this.state);
    }else{
         alert('username or email id already exist')
    }
   }


	render(){
		var self=this;
	  
    return(
     <Scrollbars style={{ height:window.innerHeight-90}}> 
      <Paper style={styles.smargin} zDepth={1}>
       <div style={{paddingTop:"30"}}>
        <Row>
         <Col>
           <h3>Registration</h3>
         </Col>
        </Row>
        <TextField
	       hintText="Client Name"
	       floatingLabelText="Client Name"  fullWidth={true}
	       floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineFocusStyle={styles.underlineFocusStyle}
	       floatingLabelStyle={styles.floatingLabelStyle} hintStyle={styles.hintStyle} 
	       value={self.state.name}
	         ref="CNm" onChange={self.handleOnClick}  /> <br/>
		
		    <TextField
	      hintText="Client User Name"
	      floatingLabelText="Client User Name"  fullWidth={true}
	      floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineFocusStyle={styles.underlineFocusStyle}
	      floatingLabelStyle={styles.floatingLabelStyle} hintStyle={styles.hintStyle}
	      value={self.state.username}
          ref="UNm" onChange={self.handleOnClick} onBlur={self.handleUserName}/> <br />
        {!self.state.uniquser?
          <div style={{color:red300}}>user name already exist.</div>  
         :null}   
       <TextField
        hintText="Password"
        floatingLabelText="Password"  fullWidth={true}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineFocusStyle={styles.underlineFocusStyle}
        floatingLabelStyle={styles.floatingLabelStyle} hintStyle={styles.hintStyle}
        value={self.state.password}
          ref="Pwd" onChange={self.handleOnClick}/> <br />
        
        <TextField
        hintText="Confirm Password"
        floatingLabelText="Confirm Password"  fullWidth={true}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineFocusStyle={styles.underlineFocusStyle}
        floatingLabelStyle={styles.floatingLabelStyle} hintStyle={styles.hintStyle}
        value={self.state.confirmpwd}
          ref="Cpwd" onChange={self.handleOnClick}/> <br />  

        <TextField
         hintText="Email"
         floatingLabelText="Email"  fullWidth={true}
         floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineFocusStyle={styles.underlineFocusStyle}
         floatingLabelStyle={styles.floatingLabelStyle} hintStyle={styles.hintStyle}
         value={self.state.email}
          ref="Email" onChange={self.handleOnClick} onBlur={self.handleEmail}/> <br />
        {!self.state.uniqemail? 
         <div style={{color:red300}}>email id already exist.</div>  
        :null}  

        <Row style={{marginTop:10}}>
        <Col md={2} sm={2} xs={12} >
          <SelectField value={self.state.value} autoWidth={true} style={{width:150}}
              onChange={self.handleSelectChange} floatingLabelStyle={styles.S3Font}
              hintText="Choose Role" floatingLabelText="Choose Role">
               <MenuItem value="admin" key={0} primaryText="admin" style={{width:125}} />
               <MenuItem value="client" key={1} primaryText="client" />
          </SelectField>
        </Col>
         <Col md={1} sm={2} xs={12} style={{marginRight:20,marginTop:27}}>
          <RaisedButton label="Submit" onClick={self.handleOnSubmit}/> 
         </Col> 
        {self.state.showLoading? 
          self.props.register.fetching?
           <Col md={1} sm={1} xs={1} style={{marginTop:25}}><ScaleLoader color={'#123abc'} 
           loading={self.state.fetching} /></Col>
          :<Col md={6} sm={6} xs={12} style={{marginTop:37}}>
             <label>User record inserted successfully.</label>
           </Col>:null} 
        </Row>   
        </div>          
	    </Paper>
      </Scrollbars>
	  )
	}
}

function mapStatetoProps(store) {
    return {
      register: store.Registration,
    }
};

function mapDispatchToProps(dispatch) {
 return bindActionCreators({registerData,sendRegistrationData,validateUserName,validateEmail}, dispatch);
 
}

export default connect(mapStatetoProps, mapDispatchToProps)(Register);