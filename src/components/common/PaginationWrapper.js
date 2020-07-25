import styled from 'styled-components';

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 0;

    ul {
        display: flex;
        user-select: none;
    }

    li {
        margin: 0 5px;
        cursor: pointer;
        transition: all 0.3s ease;

        &.selected {

            a {
                color: ${({ theme }) => theme.colors.blue};
                border-color: ${({ theme }) => theme.colors.blue};
                font-weight: 700;
            }
        }

        a {
            display: inline-block;
            padding: 10px;
            font-size: 18px;
            border: 1px solid #dedede;
            border-radius: 2px;
            transition: all 0.3s ease;
            outline: none;

            &:hover {
                color: ${({ theme }) => theme.colors.blue};
                border-color: ${({ theme }) => theme.colors.blue};
            }
        }

        &.previous a,
        &.next a {
            min-width: 80px;
            text-align: center;
        }
    }
`;

export default PaginationWrapper;
