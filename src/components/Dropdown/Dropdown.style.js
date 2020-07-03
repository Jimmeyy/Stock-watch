import styled from 'styled-components';

export const DropdownWrapper = styled.div`
    display: inline-block;
    position: relative;
    margin: 0 4px;
    color: ${({ theme }) => theme.colors.white};
    letter-spacing: 0.2px;
    font-weight: 400;
    min-width: 190px;
    vertical-align: middle;
    transition: all 0.3s ease;
    cursor: pointer;
    user-select: none;

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 0;
    }
`;

export const DropdownMain = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;
    padding: 6px 16px;
    border: 2px solid #404040;
    border-radius: 5px;
    background-color: #404040;
    transition: all 0.3s ease;

    &:hover {
        opacity: 0.75;
    }

    span {
        transition: all 0.3s ease;
    }

    img {
        width: 18px;
        transition: all 0.3s ease;
        transform-origin: 50% 50%;
        transform: ${({ isOpen }) => isOpen && 'rotate(-180deg)'};
    }
`;

export const DropdownList = styled.ul`
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    border: 2px solid #404040;
    border-radius: 5px;
    padding: 5px 0;
    background-color: #4e4e4e;

    li {
        padding: 6px 16px;
        transition: all 0.3s ease;

        &:hover {
            color: ${({ theme }) => theme.colors.blue};
        }
    }
`;
