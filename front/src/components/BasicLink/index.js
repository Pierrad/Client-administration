import React from "react";

import * as SC from "./styled";

const BasicLink = (props) => {
  const { className, to, children } = props;

  return (
    <SC.StyledLink to={to} className={className}>
      {children}
    </SC.StyledLink>
  );
}

export default BasicLink;