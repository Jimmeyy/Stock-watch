import styled from 'styled-components';

export const ArticleWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-basis: 100%;
    padding: 32px 0;
    border-bottom: 1.5px solid #d4d4d4;

    .image-warpper {
        min-width: 350px;
        max-width: 350px;
    }

    img {
        width: 100%;
    }

    .content {
        padding-left: 50px;
    }

    .date {
        font-size: 14px;
        margin-bottom: 5px;
        color: #a5a5a5;
    }

    h2 {
        margin-bottom: 15px;
        font-size: 26px;
        letter-spacing: -0.025em;
        font-weight: 800;
    }

    a {
        display: inline-block;
        margin-top: 20px;
        font-weight: 800;
        text-transform: uppercase;
        text-decoration: underline;
    }
`;
