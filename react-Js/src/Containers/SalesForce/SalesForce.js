import React from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {connect, ReactRedux} from 'react-redux';
import {bindActionCreators} from 'redux';
import {salesForceData,sendSalesForceData,authlogin} from '../../Actions/SalesForce/salesForceAction';
import { Scrollbars } from 'react-custom-scrollbars';
import FontIcon from 'material-ui/FontIcon';

const styles = require('../AppTheme').default;

class SalesForce extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
  	
  } 
  componentWillReceiveProps(nextProps){
   
  } 

  handleSubmit(cloudNm){
    var userId=localStorage.getItem('userId');
    var userName=localStorage.getItem('username')

    var serverdata={userId:userId,userName:userName};
        this.props.authlogin(cloudNm,serverdata).then(function(resolve){
          var win=window.open(resolve,'_blank',
             'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=600,height=500');
        })
        .catch(function(error){
            console.log(error)
        });
  }

	render(){
		var self=this;
    const customIcon = (<i className="material-icons">cloud</i>) 
	  
    return(
       <Paper style={styles.smargin} zDepth={1}>
       <Grid style={{paddingTop:50}}>
       <Scrollbars style={{ height:window.innerHeight-90}}>
         <Row style={{marginTop:20}}>
           <Col md={3} sm={3} xs={12} style={{marginTop:5}}>
            <label>Share your file with salesforce</label>
           </Col>
           <Col md={2} sm={2} xs={12}>
            <RaisedButton
              label="SalesForce"
              primary={true}
              onClick={self.handleSubmit.bind(self, 'salesforce')}
            >
            </RaisedButton>
           </Col>
         </Row>

         <Row style={{marginTop:20}}>
           <Col md={3} sm={3} xs={12} style={{marginTop:5}}>
            <label>Share your file with Eloqua</label>
           </Col>
           <Col md={2} sm={2} xs={12}>
            <RaisedButton
              label="Eloqua"
              primary={true}
              onClick={self.handleSubmit.bind(self, 'eloqua')}
            />
           </Col>
         </Row>

         <Row style={{marginTop:20}} >
           <Col md={3} sm={3} xs={12} style={{marginTop:5}}>
            <label>Share your file with Google Drive</label>
           </Col>
           <Col md={2} sm={2} xs={12}>
            <RaisedButton
              label="Google Drive"
              primary={true}
              onClick={self.handleSubmit.bind(self, 'googledrive')}
            />
           </Col>
         </Row>

         <Row style={{marginTop:20}}>
           <Col md={3} sm={3} xs={12} style={{marginTop:5}}>
            <label>Share your file with Drop Box</label>
           </Col>
           <Col md={2} sm={2} xs={12}>
            <RaisedButton
              label="Drop Box"
              primary={true}
              onClick={self.handleSubmit.bind(self, 'dropbox')}
            />
           </Col>
         </Row>

         <Row style={{marginTop:20}}>
           <Col md={3} sm={3} xs={12} style={{marginTop:5}}>
            <label>Share your file with One Drive</label>
           </Col>
           <Col md={2} sm={2} xs={12}>
            <RaisedButton
              label="One Drive"
              primary={true}
              onClick={self.handleSubmit.bind(self, 'onedrive')}
            />
           </Col>
         </Row>

        {/*<TextField
	      hintText="Client Id"
	      floatingLabelText="Client Id"  fullWidth={true}
	      floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineFocusStyle={styles.underlineFocusStyle}
	      floatingLabelStyle={styles.floatingLabelStyle} hintStyle={styles.hintStyle} 
	      value={self.state.clientId}
	      ref="CId" onChange={self.handleRedux.bind(self)} /> <br/>
		
		    <TextField
	      hintText="Client Secret Key"
	      floatingLabelText="Client Secret Key"  fullWidth={true}
	      floatingLabelFocusStyle={styles.floatingLabelFocusStyle} underlineFocusStyle={styles.underlineFocusStyle}
	      floatingLabelStyle={styles.floatingLabelStyle} hintStyle={styles.hintStyle}
	      value={self.state.clientSecretKey}
          ref="CSK" onChange={self.handleRedux.bind(self)}/> <br />

        <Row style={{paddingTop:"30"}}>
         <Col md={2} style={{paddingTop:20,paddingRight:0}}><label>Select Object</label></Col>
         <Col md={3}>
	         <DropDownMenu style={styles.SdropdownWidth}
	          value={self.state.sobject} 
	          onChange={this.handleChange} >
             <MenuItem value='Account' primaryText="Account" />
             <MenuItem value='Lead' primaryText="Lead" />
           </DropDownMenu>
         </Col>
         <Col md={3} style={{paddingTop:10}}>
          <RaisedButton label="Submit"  onClick={self.handleSubmit.bind(self)}/>
         </Col>
        </Row>*/}
          </Scrollbars>
        </Grid> 
	   </Paper>
	  )
	}
}

function mapStatetoProps(store) {
    return {
      salesforce: store.SalesForce
    }
};

function mapDispatchToProps(dispatch) {
 return bindActionCreators({salesForceData,sendSalesForceData,authlogin}, dispatch);
 
}

export default connect(mapStatetoProps, mapDispatchToProps)(SalesForce);