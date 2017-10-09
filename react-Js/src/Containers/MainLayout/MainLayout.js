import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../../Components/layouts/Header/Header';
import SideNavBarLarge from '../../Components/layouts/SideNavBar/SideNavBarLarge';
import SideNavBarSmall from '../../Components/layouts/SideNavBar/SideNavBarSmall';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import SubHeader from '../../Components/layouts/SubHeader/SubHeader.js';


import Data from '../data';

class MainLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
 
  render() {

    return (
      <div>
        <Header/>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  width: PropTypes.number
};

export default withWidth()(MainLayout);
