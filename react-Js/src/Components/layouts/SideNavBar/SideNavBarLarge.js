import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {white,blue300} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import { Scrollbars } from 'react-custom-scrollbars';

const styles = require('./SideNavBarCss').default;

class SideNavBarLarge extends React.Component {
  
 state = {
      open0 :true,
      open1 :true,
      open2 :true 
  };

 handleToggle = (k, e) => {
    var key = 'open' + k;
    var newState = {};
    newState[key] = !this.state[key];
    this.setState(newState);
  };

  render() {

    const { navDrawerOpen,username } = this.props; 

    return(
  <div>
  <Drawer docked={true} open={navDrawerOpen} width={200}>
      <div style={styles.logo}>S3 Integration</div>
       <div>
        {this.props.menus.map((menu, index) => 
            <div>
                <ListItem 
                    key={index}
                    innerDivStyle={{paddingLeft: 50}}
                    style={styles.menuItem}
                    primaryText={menu.text}
                    leftIcon={menu.icon }
                    rightIconButton={<SvgIcon style={styles.droparrow} onTouchTap={this.handleToggle.bind(this, index)}>
                                      {this.state['open' + index] ? <path d="M7 10l5 5 5-5z"/>:<path d="M7 14l5-5 5 5z" />  }
                                     </SvgIcon>}
                    hoverColor={blue300}

                    initiallyOpen={true}
                    onTouchTap={this.handleToggle.bind(this, index)}
                    open={this.state['open' + index]}
                    nestedListStyle={{padding: 0}}
                    nestedItems={
                      menu.children.map((child, i) => 
                       
                         <ListItem
                              key={(i+1)*10}
                              value={index+i}
                              innerDivStyle={{paddingLeft: 50}}
                              hoverColor={blue300}
                              primaryText={child.text} style={styles.menuItem} 
                              containerElement={<Link to={child.link}/>}
                          />
                       
                       )
                    }    
              
                />
                <Divider style={styles.divider} />
            </div>
        )}
      </div>
  </Drawer >
 </div>
  )};

 
};

SideNavBarLarge.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

export default SideNavBarLarge;
