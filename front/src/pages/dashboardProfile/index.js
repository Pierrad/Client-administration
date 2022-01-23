import React, { useState } from "react";
import { connect } from "react-redux";
import { LOGOUT, DELETE } from "../../redux/actions/me-action";

import * as SC from "./styled";

const DashboardProfile = ({ logout, me, deleteAccount }) => {
  const { email, username, firstName, lastName, address, subscription, _id } = me;

  const [inputMail, setInputMail] = useState(email);
  const [inputUsername, setInputUsername] = useState(username);
  const [inputFirstName, setInputFirstName] = useState(firstName);
  const [inputLastName, setInputLastName] = useState(lastName);
  const [inputAddress, setInputAddress] = useState(address);

  const handleLogout = () => {
    logout();
  };

  const handleDelete = () => {
    if (me) {
      deleteAccount(me);
    }
  };

  const handleRedirectoToPayment = () => {
    const paymentAppURL = process.env.REACT_APP_PAYMENT_URL;
    window.location.href = `${paymentAppURL}/?id=${_id}`;
  }

  const handleChangeInputMail = (e) => {
    setInputMail(e.target.value);
  };

  const handleChangeInputUsername = (e) => {
    setInputUsername(e.target.value);
  };

  const handleChangeInputFirstName = (e) => {
    setInputFirstName(e.target.value);
  };

  const handleChangeInputLastName = (e) => {
    setInputLastName(e.target.value);
  };

  const handleChangeInputAddress = (e) => {
    setInputAddress(e.target.value);
  };

  return (
    <SC.Container>
      <SC.Menu current={2} />
      <SC.Wrapper>
        <SC.Title>Profile</SC.Title>
        <SC.Box>
          <SC.Left>
            <SC.Input
              type="text"
              name=""
              placeholder="Email"
              value={inputMail}
              onChange={handleChangeInputMail}
            />

            <SC.Input
              type="text"
              name=""
              placeholder="First Name"
              value={inputFirstName}
              onChange={handleChangeInputFirstName}
            />
            <SC.Input
              type="text"
              name=""
              placeholder="Last Name"
              value={inputLastName}
              onChange={handleChangeInputLastName}
            />
          </SC.Left>
          <SC.Right>
            <SC.Input
              type="text"
              name=""
              placeholder="Username"
              value={inputUsername}
              onChange={handleChangeInputUsername}
            />
            <SC.Input
              type="text"
              name=""
              placeholder="Address"
              value={inputAddress}
              onChange={handleChangeInputAddress}
            />
            <SC.Input
              type="text"
              name=""
              placeholder="Subscription type"
              value={subscription}
            />
          </SC.Right>
        </SC.Box>
        <SC.Buttons>
          <SC.Button>Save</SC.Button>
          {subscription === "standard" && (
            <SC.Button onClick={handleRedirectoToPayment}>Subscribe</SC.Button>
          )}
          <SC.Button onClick={handleLogout}>Logout</SC.Button>
          <SC.Button onClick={handleDelete}>Delete my account</SC.Button>
        </SC.Buttons>
      </SC.Wrapper>
    </SC.Container>
  );
};

const mapStateToProps = (state) => ({
  me: state.me.me,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch({ type: LOGOUT }),
  deleteAccount: (input) => dispatch({ type: DELETE, payload: input }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProfile);
