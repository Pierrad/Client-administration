import styled from "styled-components";
import { ReactComponent as ProfilIcon } from '../../assets/svg/profil.svg';


import Button from "../Button";

export const Header = styled.header`
  display: flex;
  border-bottom: 1px solid #e6e6e6;
  justify-content: center;
  position: relative;
`

export const Img = styled.img`
  width: 20rem;
  height: auto;
  cursor: pointer;
`

export const Right = styled.div`
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
`

export const Login = styled(Button)``

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Name = styled.div`
  margin-right: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
`

export const Icon = styled(ProfilIcon)`
  width: 2rem;
  height: 2rem;
  border: 1px solid ${props => props.theme.colors.orange};
  border-radius: 50%;
  padding: .2rem;
  cursor: pointer;
  color: ${props => props.theme.colors.orange};
`