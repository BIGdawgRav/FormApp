/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,

} from "reactstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { backEndBaseUrl } from "../../constants/Urls"
import { notify } from "../../functions/functions"


const LoginPage = (props) => {

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

  const handleSignIn = () => {

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
            headers: { },
          }
        )
        .then((response) => {

          console.log("djdjd")

          console.log(response)
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


              history.push("/admin/dashboard");
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
    <>




      <Card className="card-register" >
        <CardHeader >


          <CardImg
            alt="..."


            src={require("./../../assets/img/square4.png").default}
          />

          <CardTitle   >  <div style={{ paddingLeft: 50 }}>  Login  </div>  </CardTitle>

        </CardHeader>
        <CardBody>
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
              />
            </InputGroup>
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSignIn();
                  }
                }}


              />
            </InputGroup>

          </Form>
        </CardBody>

        <CardFooter>
          <Button className="btn-round" color="info" size="lg" onClick={() => {
            handleSignIn();
          }}>
            Login
          </Button>

        </CardFooter>
      </Card>


    </>
  );
}



export default connect()(LoginPage);