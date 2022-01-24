import styled from 'styled-components';

import BasicLink from '../BasicLink';

export const Container = styled.div`
  width: 100%;
  height: 5rem;
  background-color: rgba(255, 152, 0, .2);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Box = styled.div`
  display: flex;
  & div {
    &:first-child {
    margin-right: 1rem;
    }
    &:last-child {
      margin-left: 1rem;
    }
  } 
`

export const Entry = styled.div`
  border-bottom: ${props => props.isActive ? `1px solid rgba(255, 152, 0, .5)` : `1px solid transparent`};
`

export const Link = styled(BasicLink)``

export const Link2 = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 200;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.orange};
    text-decoration: none;
  }
`