import styled from 'styled-components';
import { transform } from 'lodash';

export const SideMenuWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 999;
    overflow: hidden;
    background-color: rgba(33, 33, 33, 0.5);
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    transition: all 0.1s ease;
`;

export const SideMenuMain = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 350px;
    height: 100%;
    background-color: #333333;
    padding: 70px 30px 30px 30px;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: all 0.3s ease;

    h3 {
        color: ${({ theme }) => theme.colors.white};
    }
`;
