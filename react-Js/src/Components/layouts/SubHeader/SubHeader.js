import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import {Link} from 'react-router-dom';
import {white,black, blue500,grey900,grey200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';

const styles = require('../../AppTheme').default;

function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
class SubHeader extends React.Component{

   state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  
 render() {
       const { value } = this.state;
     return (
      <div> 
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Item One" value={0}/>
            <Tab label="Item Two" value={1}/>
          </Tabs>
        </AppBar>

        {value === 0 && <TabContainer>{'Item One'}</TabContainer>}
        {value === 1 && <TabContainer>{'Item Two'}</TabContainer>}
        
      </div>  
      );
  }
}

export default SubHeader;