import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        overflow-x: hidden;
        overflow-y: auto;
        font-size: 16px;
        font-family: 'Open sans';
        letter-spacing: '-0.25px';
        color: ${({ theme }) => theme.colors.black};
        background-color: ${({ theme }) => theme.colors.white};
    }

    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    ol, ul {
	    list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    input, select, button, textarea {
        font-size: 16px;
        font-family: 'Open sans';
        letter-spacing: '-0.25px';
        color: ${({ theme }) => theme.colors.black};
        outline: none;
        cursor: pointer;
    }

    a {
        color: ${({ theme }) => theme.colors.black};
        text-decoration: none;
    }
`;

export default GlobalStyle;
