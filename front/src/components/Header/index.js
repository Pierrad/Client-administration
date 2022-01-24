import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom"

import logo from "../../assets/images/logo.png"

import * as SC from "./styled"

const Header = (props) => {
  const { me } = props
  const isConnected = me._id !== undefined

  const history = useHistory();

  function handleHomeClick() {
    window.location.href = `${process.env.REACT_APP_PRODUCT_URL}`
  }

  function handleLoginClick() {
    history.push("/login");
  }

  function handleProfileClick() {
    history.push("/dashboard/profile");
  }

  return (
    <SC.Header>
      <SC.Img src={logo} alt="logo" onClick={handleHomeClick} />
      <SC.Right>
        {isConnected ? (
          <SC.Profile>
            <SC.Name>Hello {me.username}</SC.Name>
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
  me: state.me.me
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Header);