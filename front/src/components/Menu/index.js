import React from "react";
import { connect } from "react-redux";

import * as SC from "./styled";

const Menu = (props) => {
  const { className, current, me } = props;

  const handleRedirectToRecipe = () => {
    const productAppURL = process.env.REACT_APP_PRODUCT_URL
    window.location.href = `${productAppURL}/dashboard?id=${me._id}&token=${me.token.token}`
  }

  return (
    <SC.Container className={className}>
      <SC.Box>
        <SC.Entry isActive={current === 1}>
          <SC.Link2 onClick={handleRedirectToRecipe}>Recipe</SC.Link2>
        </SC.Entry>
        <SC.Entry isActive={current ===2}>
          <SC.Link to="/dashboard/profile">Profile</SC.Link>
        </SC.Entry>
      </SC.Box>
    </SC.Container>
  );
}

const mapStateToProps = (state) => ({
  me: state.me.me,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);