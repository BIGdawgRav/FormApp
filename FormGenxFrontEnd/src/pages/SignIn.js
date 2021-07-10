import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { backEndBaseUrl } from "../constants/Urls"
import { notify } from "../functions/functions"
import { Link } from 'react-router-dom';
import classnames from "classnames";
import { fetchUserForms } from "../reducers/UserFormReducer";
import store from "../app/store"
import Button from "../components/CustomButtons/Button"

import {
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,

} from "reactstrap";

import Header from '../partials/Header';

const SignIn = (props) => {

  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [mounted, setMounted] = useState(true);
  const [loginState, setLoginState] = useState({ isLoading: false });

  const [errors, setErrors] = useState({
    emailPasswordErrors: "",
    notAuthorised: false,
    otherErrors: null,
  });
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  })


  useEffect(() => {
    if (errors.emailPasswordErrors === 400) {
      notify(
        "Incorrect Username or Password",
        "Please provide login details or click forgotten password",
        "danger"
      );
    } else if (errors.notAuthorised) {
      notify(
        "Unauthorised User",
        "User doesnt have valid authorisation",
        "danger"
      );
    } else if (errors.otherErrors !== null) {
      notify(
        "Error Occured",
        "Please type your login details and login again",
        "danger"
      );
    }
  }, [errors]);
  const history = useHistory();

  const emailInputChange = (e) => {
    if (e.length !== 0) {
      setLoginDetails({
        ...loginDetails,
        email: e.currentTarget.value,
        check_textInputChange: true,
      });
    } else {
      setLoginDetails({
        ...loginDetails,
        email: e.currentTarget.value,
        check_textInputChange: false,
      });
    }
  };

  const passwordInputChange = (val) => {
    setLoginDetails({
      ...loginDetails,
      password: val.currentTarget.value,
    });
  };

  const handleSignIn = (e) => {
    e?.preventDefault();
    if (mounted) {
      setLoginState({ isLoading: true });


      axios
        .post(
          backEndBaseUrl + "/login/",
          {
            email: loginDetails.email,
            password: loginDetails.password,
          },
          {
            headers: {},
          }
        )
        .then((response) => {


          if (response.data.user.is_creator || response.data.user.is_formuser) {

            window.sessionStorage.setItem("userToken", response.data.key);

            window.sessionStorage.setItem(
              "isCreator",
              response.data.user.is_creator
            );
            window.sessionStorage.setItem(
              "isFormUser",
              response.data.user.is_formuser
            );


            props.dispatch({
              type: "SIGNIN",
              userToken: response.data.key,
              isCreator: response.data.user.is_creator,
              isFormUser: response.data.user.is_formuser,
              userData: response.data.user,
            });

            if (response.data.user.is_creator) {
              store.dispatch(fetchUserForms);

              history.push("/admin/myform");
            }
          } else {

            props.dispatch({ type: "SIGNOUT" });
            setErrors({
              notAuthorised: true,
            });
            setLoginState({ isLoading: false });
          }
        })
        .catch((error) => {
          console.log(error)
          if (!error.response) {
            setErrors({
              otherErrors: "Unknown Error",
            });
          } else if (error.response.status === 400) {
            setErrors({
              otherErrors: "Unknown Error",
            });
          } else if (error.response.status === 400) {
            setErrors({
              emailPasswordErrors: 400,
            });
          } else {
            setErrors({
              otherErrors: error.response.status,
            });
          }
          setLoginState({ isLoading: false });
        });
    }
    return () => {
      setMounted(false);
    };
  };



  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome back. Sign in using your email and password.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email</label>

                      <div style={{ width: "100%" }} >


                        <Form className="form">
                          <InputGroup
                            className={classnames({
                              "input-group-focus": emailFocus,
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="text"

                              onFocus={(e) => setEmailFocus(true)}
                              onBlur={(e) => setEmailFocus(false)}
                              onChange={(e) => {
                                emailInputChange(e);
                              }}
                              style={{ width: 400 }}
                            />
                          </InputGroup>
                        </Form>

                      </div>




                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <Link to="reset-password" className="text-sm font-medium text-blue-600 hover:underline">Having trouble signing in?</Link>
                      </div>
                      <Form className="form">

                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                            onChange={(val) => passwordInputChange(val)}
                            style={{ width: 400 }}

                            onKeyDown={(e) => {
                          
                              if (e.key === "Enter") {
                                handleSignIn(e);
                              }
                            }}


                          />
                        </InputGroup>

                      </Form>
                    </div>
                  </div>



                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          {/* <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-600 ml-2">Keep me signed in</span> */}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>


                  </div>



                  <div className="flex flex-wrap -mx-3 mt-6">


                    <Button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" type="button" color="info" onClick={() => {
                      handleSignIn();
                    }}>
                      Sign in

                    </Button>

                  

                  </div>
                </form>


                <div className="text-gray-600 text-center mt-6">
                  Don’t you have an account? <Link to="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

export default connect()(SignIn);