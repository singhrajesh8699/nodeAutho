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
import {fileUpload,getSObjectList,downloadFile} from '../../Actions/S3/s3Action';
import { ScaleLoader } from 'react-spinners';
import SelectField from 'material-ui/SelectField';



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
    _.bindAll(this, 'handleFileUpload', 'handleOnSubmit','handleDownload');
 } 

 componentWillMount()
 {
   this.props.getSObjectList();
 }

 componentWillReceiveProps(nextProps){
 
 }

 
  handleFileUpload(e) {
    this.setState({file:e.target.files[0],buttonLabel:e.target.files[0].name})
  }

  handleOnSubmit(){
   if(this.state.file!==null){
      this.setState({fetching:true})
      this.props.fileUpload(this.state.file).then((resolve)=>{
         this.setState({fetching:false,status:resolve})
      }).catch(function(){

      })
   } 
  }

   handleSelectChange = (event, index, value) => {
    this.setState({value:value});
  }

  handleDownload(){
     if(this.state.value!='')
     {
      var DownloadData={userId:localStorage.getItem('userId'),
                        file:this.state.value}
      this.props.downloadFile(DownloadData);
     }
  }

  
	render(){
		var self=this;
     const items = []; 
      if(!self.props.s3.fetching)
      {
         self.props.s3.sobjtList.sort(function(a,b){
           return new Date(b.LastModified)-new Date(a.LastModified);
         })
         _.forEach(self.props.s3.sobjtList, function(value, key) {
               items.push(<MenuItem value={value.Key} key={key} 
                primaryText={value.Key} autoWidth={true} />);
               });
      }

	return(
    <div>  
      <Paper zDepth={1} style={styles.s3margin1}>
        <Toolbar>
          <ToolbarGroup>
            <p>Upload File To ZyloTech Platform</p>
          </ToolbarGroup>
        </Toolbar>
        <Divider />
        <Grid>
          <Row style={{margin:20}}>
            <Col md={2} sm={2} xs={12} style={{marginTop:20,paddingRight:0}}>
              <label >Choose File</label> 
            </Col>
            <Col md={2} sm={3} xs={12} style={{marginTop:10,paddingLeft:0}}>
              <RaisedButton label={this.state.buttonLabel} labelPosition="before" containerElement="label">
                <input type="file" onChange={this.handleFileUpload} style={styles.innerFileInput}/>
              </RaisedButton>
            </Col>
            <Col md={1} sm={2} xs={12} style={{marginTop:10,padding:0,marginRight:10,marginLeft:0}}>
              <RaisedButton label="Upload" labelPosition="before" 
                containerElement="label" onClick={this.handleOnSubmit}/>
            </Col>    
            <Col md={6} sm={4} xs={12} style={{marginTop:15,paddingRight:40,paddingLeft:0}}>    
              {self.state.fetching ? 
                <ScaleLoader color={'#123abc'} loading={self.state.fetching}/>
                :self.state.status}
            </Col>
          </Row>
        </Grid>
      </Paper>

      <Paper style={styles.s3margin2} zDepth={1}>
        <Toolbar>
          <ToolbarGroup>
            <p>Download File From ZyloTech Platform</p>
          </ToolbarGroup>
        </Toolbar>
        <Divider />
        <Grid>
          <Row style={{margin:20}}>
            <Col md={5} sm={6} xs={12} styles={{margin:0,padding:0}}>
             <SelectField value={self.state.value} autoWidth={true} maxHeight={200} 
              onChange={self.handleSelectChange} floatingLabelStyle={styles.S3Font}
              hintText="choose file to Download" floatingLabelText="choose file to Download">
                {items}
             </SelectField>
            </Col>
            <Col md={2} sm={2} xs={12} style={styles.S3Dmargin}>
              <RaisedButton label="Download" labelPosition="before" 
                containerElement="label" onClick={this.handleDownload}/>
            </Col>  
          </Row>
        </Grid>
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
 return bindActionCreators({fileUpload,getSObjectList,downloadFile}, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(S3);