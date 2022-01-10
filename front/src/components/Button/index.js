import React from 'react';

import * as SC from './styled';

const Button = (props) => {
  const {className, onClick, children, type, isOutlined} = props;

  return (
    <SC.Button className={className} onClick={onClick} type={type} isOutlined={isOutlined}>
      {children}
    </SC.Button>
  );
}

export default Button;