import styled from 'styled-components';

export const FooterWrapper = styled.footer`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px 0;
    background-color: #232323;
    color: ${({ theme }) => theme.colors.white};

    /* temp */
    h1 {
        text-align: center;
        color: white;
    }

    .footer-heading {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: 700;
    }
`;

export const FooterList = styled.div`
    display: flex;
    padding: 25px 0;

    li:not(:first-child) {
        position: relative;
        padding: 5px 0 5px 20px;

        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 10px;
            height: 1px;
            opacity: 0.75;
            background-color: ${({ theme }) => theme.colors.white};
        }
    }
`;

export const FooterCol = styled.div`
    flex: 0.25;
`;

export const FooterCopyrights = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 15px;
    border-top: 1px solid #3c3c3c;

    p {
        font-size: 14px;
        color: #696969;
    }
`;

export const FooterSocials = styled.ul`
    display: flex;
    margin: 0 -8px 26px -8px;

    li {
        width: 32px;
        height: 32px;
        padding: 0;
        margin: 0 8px;
        background: no-repeat center center / 100%;

        &.facebook {
            background-image: url('./icons/white/facebook.svg');
        }

        &.instagram {
            background-image: url('./icons/white/instagram.svg');
        }

        &.twitter {
            background-image: url('./icons/white/twitter.svg');
        }

        &.youtube {
            background-image: url('./icons/white/youtube.svg');
        }
    }
`;

export const FooterSubscription = styled.div`
    display: flex;
`;
