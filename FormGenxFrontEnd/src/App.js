import React, { useEffect } from 'react';
import {
  Switch,
  Route,
Redirect
} from 'react-router-dom';
import { connect } from "react-redux";
import './css/style.scss';
import { BrowserRouter as Router } from "react-router-dom";
import AOS from 'aos';
import Admin from "./layouts/Admin"
import DeployedForm from './views/DeployedForm/index'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';

function App({ userToken, isCreator, isLoading, formData, ...props }) {


  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  const ProtectedRoute = ({component : Component, ...rest}) => {

    return(
      < Route 
        {...rest} 
        render= {(prop) => {

          if(userToken){

            return < Component {...props} />
          }
          else {
            return <Redirect to = {
              {
                pathname:"/",
                state: {
                  from: props.location
                }
              }
            } />
          }
        }}
        />
    );
  };

  

  return (
    <>
        <Router> 
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/signin" render={(props) => <SignIn  {...props} />} />

        <Route path="/signup">
          <SignUp />
        </Route>

        <ProtectedRoute 
        path="/admin" component={Admin} />


        <Route path="/reset-password">
          <ResetPassword />
        </Route>

        <Route path= "/form/:id" component = {DeployedForm}/>

        <Route 
        path="*" component={() => "404 NOT FOUND"} />

      </Switch>

      </Router>
    </>
  );
}

function mapStateToProps(state) {
  return {
    userToken: state.userTokenReducer.userToken,
    isLoading: state.userTokenReducer.isLoading,
    isCreator: state.userTokenReducer.isCreator,
    formData : state.userFormReducer.formData
  };
}
export default connect(mapStateToProps)(App);