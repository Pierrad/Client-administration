import styled from "styled-components";

import MenuC from "../../components/Menu";
import ButtonC from "../../components/Button";
import InputC from "../../components/Input";

export const Container = styled.div``

export const Menu = styled(MenuC)``

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
  margin: 2rem auto;
  align-items: center;
  text-align: left;
`

export const Title = styled.h2`
  width: 100%;
`

export const Box = styled.div`
  display: flex;
  width: 100%;
  & > div {
    margin-bottom: 1rem;
  }
`

export const Left = styled.div`
  margin-right: 2.5rem;
  width: 100%;
  & > input {
    margin-bottom: 1rem; 
  }
`

export const Right = styled.div`
  width: 100%;
  & > input {
    margin-bottom: 1rem; 
  }
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 20rem;
  & > button {
    margin-bottom: 1rem;
  }
`

export const Button = styled(ButtonC)`
  width: 20rem;
`

export const Input = styled(InputC)`
  width: 100%;
`
