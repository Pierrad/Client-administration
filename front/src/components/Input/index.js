import React from "react";

import * as SC from './styled'

const Input = (props) => {
  const { className, type, name, value, onChange, placeholder } = props;

  return (
    <SC.Input
      name={name}
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;