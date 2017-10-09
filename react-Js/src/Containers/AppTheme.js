import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white,blue600,grey500, grey900,grey600,grey800,black,blue500,grey300} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';

const AppTheme = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: blue600
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: blue600,
  },

   charGap:{
    paddingTop: 5,
  },

/****************************login****************************************/

  loginContainer: {
      minWidth: 320,
      maxWidth: 400,
      height: 'auto',
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      margin: 'auto'
    },
    Lpaper: {
      padding: 20,
      overflow: 'auto'
    },
    buttonsDiv: {
      textAlign: 'center',
      padding: 10
    },
    flatButton: {
      color: grey500
    },
    checkRemember: {
      style: {
        float: 'left',
        maxWidth: 180,
        paddingTop: 5
      },
      labelStyle: {
        color: grey500
      },
      iconStyle: {
        color: grey500,
        borderColor: grey500,
        fill: grey500
      }
    },
    loginBtn: {
      float: 'right'
    },
    btn: {
      background: '#4f81e9',
      color: white,
      padding: 7,
      borderRadius: 2,
      margin: 2,
      fontSize: 13
    },
    btnFacebook: {
      background: '#4f81e9'
    },
    btnGoogle: {
      background: '#e14441'
    },
    btnSpan: {
      marginLeft: 5
    },
 


/************************Common*******************************************/
 
  inkBarStyle:{
    backgroundColor:blue500,
    height:5,
    position:"relative",
    bottom:3
  },
  tabs: {
    width: 200,
    float: 'left' 
  },

 scroll:{
    height:460,
    overflowY:scroll,
  },

  backgroundColor:{
    backgroundColor:white
  },

  chartTitle:{
   color:black,
   textTransform: "uppercase"
  },
   

   marginTop:{
    "marginTop":10
  },
  navigation: {
    fontSize: 15,
    fontWeight: 400,
    color: grey600,
    paddingBottom: 15,
    display: 'block',
    float:"right",
    marginRight: 36
    
  },
  title:{
    fontWeight: 700,
    color: "#666",
    float: "left",
    width: "auto",
    margin: 0,
    padding: 0,
    fontSize: 20,
    opacity: .9,
    textTransform: "uppercase"
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,

  },
  swipeable: {
    clear: 'left',
    paddingTop: 10,
  },
  grid: {
    paddingLeft: 5,
  },

paper:{
  height:window.innerHeight-100,
  marginRight: 30,
  textAlign: 'center',
  display: 'inline-block',
},

margin:{
  marginLeft:62,
  marginRight:58,
  marginTop:20,
},

/******************************Home***************************************************************/
HTHeader:{
  backgroundColor:grey300
},
 HTfont:{
  fontWieght:600,
  fontSize:'medium'
 },


/****************************salesforce***********************************************************/
smargin:{
  marginLeft:65,
  marginTop:20,
  width:1160, 
  height:window.innerHeight-90,
  paddingLeft:70,
  paddingRight:70,
},

floatingLabelFocusStyle:{
  color:blue500,
  fontSize:30,
},

floatingLabelStyle:{
  fontSize:20,
},
hintStyle:{
  fontSize:20,
},
underlineFocusStyle:{
  borderColor:blue500,
},

SdropdownWidth: {
  width: 150,
 },

/*************************************************S3************************************************/
s3margin1:{
  marginLeft:65,
  marginRight:57,
  marginTop:20,
  height:(window.innerHeight-120)/3,
},
s3margin2:{
  marginLeft:65,
  marginRight:57,
  marginTop:20,
  height:2*(window.innerHeight-120)/3,
},
 

innerFileInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },

  S3Font:{
    fontSize:"large",
    fontWeight:600
  },
  S3Dmargin:{
    marginTop:25,padding:0,
  },


});


export default AppTheme;