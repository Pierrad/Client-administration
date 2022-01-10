import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 200;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.orange};
    text-decoration: none;
  }
`