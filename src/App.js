import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import './App.css';
//Added
import history from './history/history';
import 'antd/dist/antd.css';

//Redux
import { Provider } from 'react-redux'
import store from './store'

import {  Login } from './views/Pages';
import { DefaultLayout } from './containers';


class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
         <Switch>
           <Route exact path="/login" name="Login Page" component={Login} />
           <Route path="/" name="Home" component={DefaultLayout} />
         </Switch>
        </Router>
       </Provider>
    );
  }
}

export default App;
