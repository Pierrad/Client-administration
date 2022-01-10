import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
`

export const Title = styled.h1`
    color: ${props => props.theme.colors.black};
    margin: 0;
    text-align: left;
`

export const Box = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: 5rem;
    max-width: 30rem;
    margin-left: 10rem;
    & > input {
        margin-bottom: 1rem;
    }
    & > button {
        width: 10rem;
    }
`


const topToBottom = keyframes`
  0% {
    transform: translate(-50%, -5rem);
    opacity: 1;
  }
  10% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  85% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -10rem);
    opacity: 0;
  }
`

export const ErrorContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translate(-50%);
  width: 40%;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.pureWhite };
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 0.2rem;
  display: flex;
  flex-direction: row;
  animation: ${topToBottom} 5s ease-in-out;
  @media (max-width: 768px) {
    animation: ${topToBottom} 5s ease-in-out;
    top: 1rem;
  }
`

export const Anim = styled.div`
  width: max-content;
`

export const Error = styled.div`
  color: ${props => props.theme.colors.darkOrange };
  font-size: 1rem;
  font-weight: bold;
  text-transform: capitalize;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`