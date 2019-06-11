import React, { Component } from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import DefaultLayout from "./index";
import routes from '../../routes'
import history from '../../history/history'
import DefaultBreadcrumps from './DefaultBreadcrumps';
import DefaultHeader from './DefaultHeader';



class DefaultSidebar extends Component {
  constructor(props){
    super(props);
      this.state = {
        redirectState:'/login'
     }
  }


/*
(

           |||||||
          ( O   O )
   ____oOO___(_)___OOo____
  (_______________________) METHODS

*/
  changeRedirectState = () => {
    const checkToken =  window.localStorage.getItem("session");
    if(checkToken){
      this.setState({
        redirectState:'/user'
      })
    }else{
      this.setState({
        redirectState:'/login'
      })
    }
  }

  componentWillMount(){
    this.changeRedirectState()
  }

    render(){
      return (
        <div>
          <div>
            <DefaultHeader/>
            <DefaultBreadcrumps/>
          </div>
          <div className="switch" style={{padding:"24px"}}>
            <Switch>
              {routes.map((route, idx) => {
                return route.component ?
                (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...props} />
                  )} />)
                  : (null);
               },
              )}
              <Redirect from="/" to={this.state.redirectState} />
            </Switch>
          </div>
        </div>
     );
   }
 }

 export default DefaultSidebar;
