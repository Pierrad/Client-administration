import React from "react"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"


import logo from "../../assets/images/logo.png"

import * as SC from "./styled"

const Header = (props) => {
  const { isConnected, me } = props
  const history = useHistory();

  function handleHomeClick() {
    window.location.href = `${process.env.REACT_APP_PRODUCT_URL}`
  }

  function handleLoginClick() {
    history.push("/login");
  }

  function handleProfileClick() {
    history.push("/dashboard");
  }

  return (
    <SC.Header>
      <SC.Img src={logo} alt="logo" onClick={handleHomeClick} />
      <SC.Right>
        {isConnected ? (
          <SC.Profile>
            <SC.Name>{me.username}</SC.Name>
            <SC.Icon onClick={handleProfileClick} />
          </SC.Profile>
        ) : (
          <SC.Login isOutlined onClick={handleLoginClick}>Login</SC.Login>
        )}
      </SC.Right>
    </SC.Header>
  )
}

const mapStateToProps = (state) => ({
  me: state.me.me,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);