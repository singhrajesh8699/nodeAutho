import React, {Component} from 'react';
import {connect, ReactRedux} from 'react-redux';
import {bindActionCreators} from 'redux';
import {grey300,cyanA400} from 'material-ui/styles/colors';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {dashBoadRecord} from '../../Actions/Home/homeAction';
import { RingLoader } from 'react-spinners';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';


const styles = require('../AppTheme').default;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state={loader:true};
  }
  
  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount(){
    var userId=localStorage.getItem("userId")
    this.props.dashBoadRecord({userId:userId});
  }

  componentWillReceiveProps(nextProps){
     this.setState({loader:nextProps.home.data==null})
  }

  
render() {
    var self=this;
    /* if(!self.props.home.authorization)
    {
       localStorage.removeItem("userId");
       localStorage.removeItem("username");
       localStorage.removeItem("jwtToken");
       self.context.router.history.push('/login');
    }*/


  return (
  <div style={styles.margin}> 
  {self.state.loader?
  <div style={{position:"relative",margin:0,left:400,top:200,width:50,height:50}}> 
      <RingLoader
          color={cyanA400} 
          loading={true} 
          margin={0}
          size={70}
        />
        <p>Loading.........</p> 
  </div> : 
   <Scrollbars style={{ height:window.innerHeight-90}}>
    <Paper style={styles.paper} zDepth={1}>
      <Table selectable={false}>
       <TableHeader adjustForCheckbox={false} displaySelectAll={false} style={styles.HTHeader}>
        <TableRow>
            <TableRowColumn style={styles.HTfont}>File Name</TableRowColumn>
            <TableRowColumn style={styles.HTfont}>Source</TableRowColumn>
            <TableRowColumn style={styles.HTfont}>Destination</TableRowColumn>
            <TableRowColumn style={styles.HTfont}>Date</TableRowColumn>
            <TableRowColumn style={styles.HTfont}>Size</TableRowColumn>
            <TableRowColumn style={styles.HTfont}>Status</TableRowColumn>
        </TableRow>
       </TableHeader> 
       <TableBody displayRowCheckbox={false}>
            {self.props.home.data!=null?self.props.home.data.records.map(function(Obj){
         return(
            <TableRow>
              <TableRowColumn>{Obj.fileName}</TableRowColumn>
              <TableRowColumn>{Obj.source}</TableRowColumn>
              <TableRowColumn>{Obj.destination}</TableRowColumn>
              <TableRowColumn>{Obj.date}</TableRowColumn>
              <TableRowColumn>{Obj.size}</TableRowColumn>
              <TableRowColumn>{Obj.status}</TableRowColumn>
            </TableRow>
            )}):null}
       </TableBody>
      </Table>
      <Divider/>
    </Paper>
   </Scrollbars> }
  </div> 
    );
  }
}

function mapStatetoProps(store) {
    return {
      home: store.Home,
    }
};

function mapDispatchToProps(dispatch) {
 return bindActionCreators({dashBoadRecord}, dispatch);
 
};

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
