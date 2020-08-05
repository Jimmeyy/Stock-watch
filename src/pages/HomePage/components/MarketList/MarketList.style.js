import styled from 'styled-components';

export const MarketListTopBar = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`;

export const MarketListWrapper = styled.div`
    margin-top: 50px;
`;

export const MarketListHeader = styled.div`
    ul {
        display: flex;
        padding: 8px 10px;
        border-bottom: 2px solid #dedede;
        user-select: none;
    }

    li {
        flex-grow: 1;
        flex-basis: 0;
        font-weight: 600;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            color: ${({ theme }) => theme.colors.blue};
        }

        span {
            display: inline-block;
            padding-right: 20px;
            background: no-repeat right center / 16px;

            &.sort-asc {
                background-image: url('/icons/black/arrow-up.svg');
            }

            &.sort-desc {
                background-image: url('/icons/black/arrow-down.svg');
            }
        }
    }
`;

export const MarketListMain = styled.div`
    /* ul {
        padding: 12px 10px;
        border-bottom: 1px solid #dedede;
        background-color: transparent;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            background-color: #ecf2ff;
        }
    }

    li {
    } */
`;
