import {spacing, typography} from 'material-ui/styles';
import {white,black, blue600,grey600} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 22,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: blue600,
    paddingLeft: 20,
    height: 56,
  },
  menuItem: {
    color: white,
    fontSize: 13,
  },
  menuText: {
    color: black,
    fontSize: 13,
    paddingRight:10,
    paddingTop:0,
    paddingBottom:0,
    paddingLeft:15,
    margin:0,
   },
  

  divider :{
    backgroundColor: grey600, 
    color: grey600,
   },

   droparrow :{
    top: 10,
    right:10,
    color:grey600
    },
   
   listStyles :{ 
    paddingTop: "0px", 
    paddingBottom: "2px",
    },
   

};

export default styles;
