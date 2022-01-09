import React, { useEffect, useState } from "react";
import Lottie from 'react-lottie';
import { connect } from "react-redux";


import Input from "../../components/Input";
import Button from "../../components/Button";
import BasicLink from "../../components/BasicLink";

import { POST_REGISTER, REGISTER_ERROR } from "../../redux/actions/register-action";

import cookingAnim from '../../assets/lottie/cooking.json';
import warningAnim from '../../assets/lottie/warning.json'

import * as SC from './styled';


function Register({ onSubmit, error, resetError }) {

  const [inputPassword, setInputPassword] = useState('');
  const [inputPseudo, setInputPseudo] = useState('');
  const [inputMail, setInputMail] = useState('');

  useEffect(() => {
    resetError()
  }, [resetError])

  if (error) {
    setTimeout(() => {
      resetError()
    }, 5000)
  }

  const handlePseudoChange = (e) => {
    setInputPseudo(e.target.value);
  };

  const handleMailChange = (e) => {
    setInputMail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(
      {
        email: inputMail,
        password: inputPassword,
        username: inputPseudo,
      }
    );
  }

  const cookingAnimOptions = {
    loop: true,
    autoplay: true,
    animationData: cookingAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const errorOptions = {
    autoplay: true,
    animationData: warningAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

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
          <SC.Title>REGISTER</SC.Title>
          <Input type="text" placeholder="Pseudo" value={inputPseudo} onChange={handlePseudoChange}  />
          <Input type="text" name="" placeholder="Email" value={inputMail} onChange={handleMailChange} />
          <Input type="password" name="" placeholder="Password" value={inputPassword} onChange={handlePasswordChange} />
          <Button type="submit" onClick={handleSubmit}>Create Account</Button>
          <p>Already have an account?</p>
          <BasicLink to="/login">Sign in here</BasicLink>
        </SC.Form>
        <Lottie
          options={cookingAnimOptions}
          height={400}
          width={400}
          isStopped={false}
          isPaused={false}
        />
      </SC.Box>
    </SC.Container>
  )
}

const mapStateToProps = (state) => ({
  error: state.register.error,
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: ({ email, password, username, exchange, key, secret }) => dispatch({ type: POST_REGISTER, payload: { email, password, username, exchange, key, secret } }),
  resetError: () => dispatch({ type: REGISTER_ERROR, payload: '' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);
