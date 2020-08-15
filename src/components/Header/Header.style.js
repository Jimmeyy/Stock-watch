import styled from 'styled-components';
import { Container } from 'components/common';

export const HeaderWrapper = styled.div`
    padding: 18px 0;
    background-color: #232323;
`;

export const HeaderContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1920px;
`;

export const HeaderLogo = styled.div`
    a {
        font-size: 25px;
        color: ${({ theme }) => theme.colors.white};
        font-weight: 700;
    }
`;

export const HeaderMenu = styled.div`
    .menu {
        position: relative;
        width: 22px;
        height: 17px;
        cursor: pointer;

        &.is-open {
            .line-top {
                opacity: 0;
            }

            .line-middle {
                transform: rotate(45deg);
            }

            .line-bottom {
                transform: translate(13%, 75%) rotate(-45deg);
            }
        }
    }

    span {
        position: absolute;
        left: 0;
        display: block;
        width: 100%;
        height: 2px;
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: 2px;
        transition: all 0.2s ease;
    }

    .line-top {
        top: 0;
    }

    .line-middle {
        top: 50%;
        transform: translateY(-50%);
        transform-origin: 50% 50%;
    }

    .line-bottom {
        bottom: 0;
        transform-origin: 0% 50%;
    }
`;
