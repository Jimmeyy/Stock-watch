import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    padding: 18px 0;
    background-color: #232323;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1260px;
        position: relative;
        margin: 0 auto;
    }
`;

export const HeaderLogo = styled.div`
    a {
        font-size: 25px;
        color: ${({ theme }) => theme.colors.white};
        font-weight: 700;
    }
`;

export const HeaderSearch = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 45%;

    .search-main {
        border-radius: 5px;
        overflow: hidden;
        padding-right: 50px;
        background-color: #404040;
        background-image: url('/icons/white/search.svg');
        background-repeat: no-repeat;
        background-size: 19px;
        background-position: right 17px center;
        cursor: pointer;
    }

    input {
        background-color: transparent;
        border: 0;
        padding: 8px 16px;
        width: 100%;
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const HeaderMenu = styled.div`
    .menu {
        position: relative;
        width: 22px;
        height: 16px;
    }

    span {
        position: absolute;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 2px;
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: 2px;
        transition: all 0.3s ease;
    }

    .line-top {
        top: 0;
    }

    .line-middle {
        top: 50%;
        transform: translateY(-50%);
    }

    .line-bottom {
        bottom: 0;
    }
`;
