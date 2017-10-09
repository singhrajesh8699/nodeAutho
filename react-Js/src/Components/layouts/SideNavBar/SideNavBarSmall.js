import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {white,blue300,grey900} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import { Scrollbars } from 'react-custom-scrollbars';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);


const styles = require('./SideNavBarCss').default;



class SideNavBarSmall extends React.Component {
  
  
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

  subMenu(menu){
        console.log(menu)
  }

  render() {

    const { navDrawerOpen,username } = this.props; 
    
    return(
      
  <div>
  <Drawer docked={true}  width={52}>
      <div style={styles.logo}></div>
       <div>
        {this.props.menus.map((menu, index) => 
            <div>
                <ListItem 
                    key={index}
                    innerDivStyle={{paddingLeft:0}}
                    style={{paddingBottom:"20px"}}
                    leftIcon={
                          <IconMenu style={{margin:0}}
                            iconButtonElement={<IconButton onMouseOver={this.subMenu({menu})}>{menu.icon}</IconButton>}
                            anchorOrigin={{horizontal: "left", vertical: 'top'}}
                            targetOrigin={{horizontal: "right", vertical: 'top'}}
                            listStyle={styles.listStyles}
                            
                          >
                            {menu.children.map((child, i) => 
                               <MenuItem
                                    key={(i+1)*10}
                                    value={index+i}
                                    hoverColor={blue300}
                                    primaryText={child.text} 
                                    menuStyle={{paddingTop:"2px"}}
                                    innerDivStyle={styles.menuText} 
                                    containerElement={<Link to={child.link}/>}
                                />)}
                         </IconMenu>
                        }
                    hoverColor={blue300}
                    onTouchTap={this.handleToggle.bind(this, index)}
                    open={this.state['open' + index]}
                    nestedListStyle={{padding: 0}}
                   />
                <Divider style={styles.divider} />
            </div>
        )}
      </div>
  </Drawer >
 </div>
  )};

 
};

SideNavBarSmall.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

export default SideNavBarSmall;
