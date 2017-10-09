import React from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {connect, ReactRedux} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import _ from 'lodash';
import {fileUpload,getSObjectList,downloadFile,browsers3upload} from '../../Actions/S3/s3Action';
import { ScaleLoader } from 'react-spinners';
import SelectField from 'material-ui/SelectField';
import axios from "axios";



const styles = require('../AppTheme').default;

class S3 extends React.Component{

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      buttonLabel:'Choose File',
      fetching:false,
      status:'',
      value:''
  }
 } 

 componentWillMount(){
    //this.props.browsers3upload();
 }

 componentWillReceiveProps(nextProps){
 
 }

  handleFileUpload(e) {
    this.setState({file:e.target.files[0]})
    var serverData={filename:e.target.files[0].name,filetype:e.target.files[0].type}
    this.props.browsers3upload(serverData);
  }

  handleOnSubmit(){
    var self=this;
    var signedUrl = self.props.s3.browsers3upload;
    var options = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        'Content-Type': self.state.file.type
      }
    };
   axios.put(signedUrl, self.state.file, options)
        .then((result)=>{
          console.log(result);
       }).catch((err)=>{
          console.log(err)
       })
  }

    
	render(){
		var self=this;
	return(
    <div>  
      <Paper zDepth={1}>
        <input type="file" name="file" onChange={self.handleFileUpload.bind(self)}/> <br />
        <input type="submit" value="Upload to Amazon S3" onClick={self.handleOnSubmit.bind(self)}/>
      </Paper>
    </div>  
	  )
	}
}

function mapStatetoProps(store) {
    return {
      s3: store.S3,
    }
};

function mapDispatchToProps(dispatch) {
 return bindActionCreators({fileUpload,getSObjectList,downloadFile,browsers3upload}, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(S3);