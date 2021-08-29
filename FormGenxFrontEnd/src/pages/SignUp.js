import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
import { backEndBaseUrl } from "../constants/Urls"
import { notify } from "../functions/functions"
import Header from '../partials/Header';
// import store from "../app/store"
import Button from "../components/CustomButtons/Button"
import LoadingIcon from "../components/LoadingIcon/LoadingIcon.js"

import {

  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,

} from "reactstrap";

const SignUp = (props) => {

  const [firstNameFocus, setFirstNameFocus] = React.useState(false);
  const [lastNameFocus, setLastNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = React.useState(false);
  const [mounted, setMounted] = useState(true);
  const [loginState, setLoginState] = useState({ isLoading: false });

  const [errors, setErrors] = useState({
    emailPasswordErrors: "",
    notAuthorised: false,
    otherErrors: null,
  });
  const [loginDetails, setLoginDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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


  const firstNameInputChange = (e) => {
    if (e.length !== 0) {
      setLoginDetails({
        ...loginDetails,
        firstName: e.currentTarget.value,
        check_textInputChange: true,
      });
    } else {
      setLoginDetails({
        ...loginDetails,
        firstName: e.currentTarget.value,
        check_textInputChange: false,
      });
    }
  };

  const lastNameInputChange = (e) => {
    if (e.length !== 0) {
      setLoginDetails({
        ...loginDetails,
        lastName: e.currentTarget.value,
        check_textInputChange: true,
      });
    } else {
      setLoginDetails({
        ...loginDetails,
        lastName: e.currentTarget.value,
        check_textInputChange: false,
      });
    }
  };


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

  const confirmPasswordInputChange = (val) => {
    setLoginDetails({
      ...loginDetails,
      confirmPassword: val.currentTarget.value,
    });
  };


  const history = useHistory();

  const handleSignUp = (e) => {

    if (e) {
      e.preventDefault()
    }


    if (mounted) {
      setLoginState({ isLoading: true });
      axios
        .post(
          backEndBaseUrl + "/creator/registration/",

          {
            first_name: loginDetails.firstName,
            last_name: loginDetails.lastName,
            email: loginDetails.email,
            password1: loginDetails.password,
            password2: loginDetails.confirmPassword,
          },
          {
            headers: { },
          }
        )
        .then((response) => {

          notify(
            "Successfully Signed up",
            "Please go to your email and verify your email address",
            "success"
          )
          history.push("/signin");
          setLoginState({ isLoading: false });


        })
        .catch((error) => {

          console.log(error.response)
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
                <h1 className="h1">Welcome. Lets get started.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">First Name <span className="text-red-600">*</span></label>

                      <Form className="form">

                        <InputGroup
                          className={classnames({
                            "input-group-focus": firstNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Firstname"
                            type="text"

                            onFocus={(e) => setFirstNameFocus(true)}
                            onBlur={(e) => setFirstNameFocus(false)}
                            onChange={(e) => {
                              firstNameInputChange(e);
                            }}
                            style={{ width: 400 }}
                          />
                        </InputGroup>
                      </Form>

                    </div>
                  </div>


                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Last Name <span className="text-red-600">*</span></label>

                      <Form className="form">

                        <InputGroup
                          className={classnames({
                            "input-group-focus": lastNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="LastName"
                            type="text"

                            onFocus={(e) => setLastNameFocus(true)}
                            onBlur={(e) => setLastNameFocus(false)}
                            onChange={(e) => {
                              lastNameInputChange(e);
                            }}
                            style={{ width: 400 }}
                          />
                        </InputGroup>
                      </Form>

                    </div>
                  </div>


                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Email<span className="text-red-600">*</span></label>

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



                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
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

                          />
                        </InputGroup>

                      </Form>
                    </div>
                  </div>



                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Confirm Password</label>
                      </div>
                      <Form className="form">


                        <InputGroup
                          className={classnames({
                            "input-group-focus": confirmPasswordFocus,
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
                            onFocus={(e) => setConfirmPasswordFocus(true)}
                            onBlur={(e) => setConfirmPasswordFocus(false)}
                            onChange={(val) => confirmPasswordInputChange(val)}
                            style={{ width: 400 }}

                            onKeyDown={(e) => {


                              if (e.key === "Enter") {
                                handleSignUp(e);
                              }
                            }}



                          />
                        </InputGroup>

                      </Form>
                    </div>
                  </div>

                </form>







                <Button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full h-12" type="button" color="info" onClick={() => {
                  handleSignUp();
                }}>
                  {loginState.isLoading ? <LoadingIcon /> :
                    "Get Started"
                  }

                </Button>


                {/* <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" onclick={handleSignIn}>Sign in</button>
*/}



                <div className="text-gray-600 text-center mt-6">
                  Already a member? <Link to="/signin" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign in</Link>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

export default SignUp;