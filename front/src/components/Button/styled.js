import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.isOutlined ? props.theme.colors.pureWhite : props.theme.colors.orange};
  border: ${(props) => props.isOutlined ? `1px solid ${props.theme.colors.orange}` : '1px solid transparent'};
  padding: 0.5rem 1rem;
  color: ${props => props.isOutlined ? props.theme.colors.orange : props.theme.colors.pureWhite};
  font-weight: bold;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.isOutlined ? props.theme.colors.orange : props.theme.colors.pureWhite};
    color: ${props => props.isOutlined ? props.theme.colors.pureWhite : props.theme.colors.orange};
    border: ${(props) => props.isOutlined ? 'none' : `1px solid ${props.theme.colors.orange}`};
  }
`