import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&display=swap');
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        overflow-x: hidden;
        overflow-y: auto;
        font-size: 16px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
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
        font-family: 'Montserrat', sans-serif;
        letter-spacing: '-0.25px';
        color: ${({ theme }) => theme.colors.black};
        outline: none;
        cursor: pointer;
    }

    a {
        color: ${({ theme }) => theme.colors.black};
        text-decoration: none;
    }

    main {
        padding: 40px 0;
        min-height: calc(100vh - 360px);
    }

    .page {
        position: relative;
    }
`;

export default GlobalStyle;
