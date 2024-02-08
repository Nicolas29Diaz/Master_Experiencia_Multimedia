import { createGlobalStyle, css } from "styled-components";

export const fonts = {
  base: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
};

export const Colors = {
  default: "#c2c2c2",
  primary: "#1D2B37",
  secondary: "#e87140",
  white: "#fff",
  black: "#232127",
  focus: "#222",
  error: "#EF3E3E",
  selectedItem: "#68CC58",
  rejectItem: "#FF6464",
  delete: "#ee0e21",
};

export const breakPoints = {
  tablet: "@media screen and (max-width: 1040px)",
  tableVertical: "@media screen and (max-width: 768px)",
};

export const scrollBarStyle = css`
  ::-webkit-scrollbar {
    width: 10px;
    height: auto;
    background-color: #f1f3f4;
  }

  ::-webkit-scrollbar-thumb {
    height: 28px;
    width: 10px;
    border-radius: 8px;
    background-color: #c4c4c4;

    :hover {
      background-color: ${Colors.black};
    }
  }

  ::-webkit-scrollbar-track:active {
    background-color: ${Colors.default};
  }
`;

export const GlobalStyles = createGlobalStyle`



html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  ul, li, h1, h2, h3,h4, p, button {
    margin: 0;
    padding: 0;
    
  }

  h1,h2,h3,h4,button{
    font-weight: 700;
  font-family: Lato;
  }

  li,span,p{
    font-family: Raleway;
  }

  ul {
    list-style: none;
    ${scrollBarStyle}
  }

  body {
    font-feature-settings: 'pnum' on, 'lnum' on;
    font-family:${fonts.base};
  }
  #root{
    width: 100%;
    height:100%;
  }  
`;
