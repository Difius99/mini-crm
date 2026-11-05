import { createGlobalStyle, css } from "styled-components";
import { COLORS as _ } from "./constants";

import StapelMediumWoff2 from "./assets/fonts/Stapel-Medium.woff2";
import StapelMediumWoff from "./assets/fonts/Stapel-Medium.woff";
import PTRootRegularWoff2 from "./assets/fonts/PTRootUI-Regular.woff2";
import PTRootRegularWoff from "./assets/fonts/PTRootUI-Regular.woff";
import PTRootMediumWoff2 from "./assets/fonts/PTRootUI-Medium.woff2";
import PTRootMediumWoff from "./assets/fonts/PTRootUI-Medium.woff";
import PTRootBoldWoff2 from "./assets/fonts/PTRootUI-Bold.woff2";
import PTRootBoldWoff from "./assets/fonts/PTRootUI-Bold.woff";

const resetCSS = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${resetCSS}

  @font-face {
    font-family: "Stapel Medium";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src:
      url(${StapelMediumWoff2}) format("woff2"),
      url(${StapelMediumWoff}) format("woff");
  }

  @font-face {
    font-family: "PT Root UI";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src:
      url(${PTRootRegularWoff2}) format("woff2"),
      url(${PTRootRegularWoff}) format("woff");
  }

  @font-face {
    font-family: "PT Root UI";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src:
      url(${PTRootMediumWoff2}) format("woff2"),
      url(${PTRootMediumWoff}) format("woff");
  }

  @font-face {
    font-family: "PT Root UI";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src:
      url(${PTRootBoldWoff2}) format("woff2"),
      url(${PTRootBoldWoff}) format("woff");
  }

  * {
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    font-family: "PT Root UI", sans-serif;
    font-size: 15px;
    line-height: 1.35;
    color: ${_.primary};
    background: ${_.backgroundPrimary};
  }

  #root {
    isolation: isolate;
    /* to make portals independent of app's stacking context */
  }

  button, input, textarea {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
