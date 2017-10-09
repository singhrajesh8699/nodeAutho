import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppTheme from './AppTheme';
import MainLayout from './MainLayout/MainLayout';
import LoginPage from './LoginPage/LoginPage';
import Home from './HomePage/Home';
import SalesForce from './SalesForce/SalesForce';
import S3 from './S3/S3';
import RegistrationPage from './Registration/register'
import Eloqua from './Eloqua/Eloqua';
import { Provider } from 'react-redux';
import store from '../Reducers/Store.js';
import requireAuth from './Utils/RequireAuthentication.js'

const history = createBrowserHistory();

const App = () => (
 
  <Provider store={store}> 
    <MuiThemeProvider muiTheme={AppTheme}>
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
        <Switch>
        	<Route exact path="/" component={LoginPage}/>
          <Route path="/login" component={LoginPage}/>
          <MainLayout>
           <Route path="/register" component={RegistrationPage}/>
            <Route path="/home" component={Home} />
            <Route path="/source" component={requireAuth(SalesForce)} />
            <Route path="/zylotech" component={requireAuth(S3)} />
            <Route path="/eloqua" component={requireAuth(Eloqua)} />
          </MainLayout>
  	  </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>
);

export default App;
