import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App/app";
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
    body {
        position: relative;
        height: 100vh;
        padding: 0;
        margin: 0;
        overflow: hidden;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, ul, li {
        font-size: inherit;
        font-weight: inherit;
        padding: 0;
        margin: 0;
    }

    * {
        box-sizing: border-box;
        font-family: Arial, sans-serif;
        font-weight: normal;
    }

    a {
        text-decoration: none;
    }

    input:focus, textarea:focus {
        outline: none;
    }

    .main {
        font-size: 18px;
        font-weight: 400;
        text-align: left;
    }
`

ReactDOM.render(
    <>
        <Global/>
        <App />
    </>,
    document.getElementById('root')
);
