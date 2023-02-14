import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0 auto;
    font-family: system-ui;
    width:100%;
    height:100%;
    max-width: 600px;
    margin-bottom: 5.5rem;
    margin-top: 5.5rem;

  }
`;
