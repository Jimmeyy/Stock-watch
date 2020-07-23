import styled from 'styled-components';

export const HomePageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`;

export const MarketList = styled.div`
    margin-top: 50px;

    ul {
        display: flex;
    }

    li {
        flex-grow: 1;
        flex-basis: 0;
        cursor: pointer;
    }

    .price-up {
        color: ${({ theme }) => theme.colors.green};
        font-weight: 600;
    }

    .price-down {
        color: ${({ theme }) => theme.colors.red};
        font-weight: 600;
    }
`;

export const MarketListHeader = styled.div`
    ul {
        padding: 8px 10px;
        border-bottom: 2px solid #dedede;
        user-select: none;
    }

    li {
        font-weight: 600;
        transition: all 0.3s ease;

        &:hover {
            color: ${({ theme }) => theme.colors.blue};
        }

        span {
            display: inline-block;
            padding-right: 20px;
            background: no-repeat right center / 16px;

            &.sort-asc {
                background-image: url('./icons/black/arrow-up.svg');
            }

            &.sort-desc {
                background-image: url('./icons/black/arrow-down.svg');
            }
        }
    }
`;

export const MarketListMain = styled.div`
    ul {
        padding: 12px 10px;
        border-bottom: 1px solid #dedede;
    }

    li {
    }
`;
