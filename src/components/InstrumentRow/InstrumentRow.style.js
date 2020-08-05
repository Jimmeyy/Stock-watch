import styled from 'styled-components';

export const Row = styled.ul`
    display: flex;
    padding: 12px 10px;
    border-bottom: 1px solid #dedede;
    background-color: transparent;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        background-color: #ecf2ff;
    }

    li {
        flex-grow: 1;
        flex-basis: 0;
        cursor: pointer;

        &.price-up {
            color: ${({ theme }) => theme.colors.green};
            font-weight: 600;
        }

        &.price-down {
            color: ${({ theme }) => theme.colors.red};
            font-weight: 600;
        }
    }
`;
