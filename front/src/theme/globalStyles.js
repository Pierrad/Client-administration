import { createGlobalStyle} from "styled-components"
import PoppinsRegular from "../assets/fonts/poppins/Poppins-Regular.woff2"
import PoppinsMedium from "../assets/fonts/poppins/Poppins-Medium.woff2"
import PoppinsLight from "../assets/fonts/poppins/Poppins-Light.woff2"
import PoppinsBold from "../assets/fonts/poppins/Poppins-Bold.woff2"

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'PoppinsRegular';
    src: url(${PoppinsRegular}) format('woff2');
  }
  @font-face {
    font-family: 'PoppinsMedium';
    src: url(${PoppinsMedium}) format('woff2');
  }
  @font-face {
    font-family: 'PoppinsLight';
    src: url(${PoppinsLight}) format('woff2');
  }
  @font-face {
    font-family: 'PoppinsBold';
    src: url(${PoppinsBold}) format('woff2');
  }
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: PoppinsRegular, Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
`