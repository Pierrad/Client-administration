import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { connect } from "react-redux";

import Input from "../../components/Input";
import Button from "../../components/Button";
import BasicLink from "../../components/BasicLink";


import { LOGIN_ERROR, POST_LOGIN } from "../../redux/actions/login-action";

import ingrediantsAnim from "../../assets/lottie/ingrediants.json";
import warningAnim from '../../assets/lottie/warning.json';


import * as SC from "./styled";

function Login({ onSubmit, error, resetError }) {
  const [inputMail, setInputMail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    resetError();
  }, [resetError]);

  if (error) {
    setTimeout(() => {
      resetError();
    }, 5000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email: inputMail, password: inputPassword });
  };

  const handleMailChange = (e) => {
    setInputMail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const errorOptions = {
    autoplay: true,
    animationData: warningAnim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const ingrediantsAnimOptions = {
    loop: false,
    autoplay: true,
    animationData: ingrediantsAnim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <SC.Container>
      <SC.Box>
        {error && (
          <SC.ErrorContainer>
            <SC.Anim>
              <Lottie options={errorOptions}
                height={70}
                width={70}
                isStopped={false}
                isPaused={false}
              />
            </SC.Anim>
            <SC.Error>{error}</SC.Error>
          </SC.ErrorContainer>
        )}
        <SC.Form>
          <SC.Title>LOGIN</SC.Title>
          <Input type="text" name="" placeholder="Email" value={inputMail} onChange={handleMailChange} />
          <Input type="password" name="" placeholder="Password" value={inputPassword} onChange={handlePasswordChange} />
          <Button onClick={handleSubmit} type="submit">Connexion</Button>
          <p>Does not have an account?</p>
          <BasicLink to="/register">Sign up here</BasicLink>
        </SC.Form>
        <Lottie
          options={ingrediantsAnimOptions}
          height={400}
          width={400}
          isStopped={false}
          isPaused={false}
        />
      </SC.Box>
    </SC.Container>
  );
}

const mapStateToProps = (state) => ({
  error: state.login.error || "",
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: ({ email, password }) =>
    dispatch({ type: POST_LOGIN, payload: { email, password } }),
  resetError: () => dispatch({ type: LOGIN_ERROR, payload: "" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
