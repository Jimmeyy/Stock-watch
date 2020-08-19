import styled from 'styled-components';

export const SearchInputWrapper = styled.div`
    display: flex;
    margin-top: 25px;
`;

export const SearchInputMain = styled.div`
    flex: 1;
    position: relative;

    input {
        width: 100%;
    }
`;

export const SearchInputList = styled.ul`
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
    position: absolute;
    width: 100%;
    left: 0;
    top: 43px;
    border-radius: 5px;
    padding: 15px;
    background-color: #ffffff;
    border: 1px solid #a29c9c;

    li {
        padding: 10px 0;
    }
`;
