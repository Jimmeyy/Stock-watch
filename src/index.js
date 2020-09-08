import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
