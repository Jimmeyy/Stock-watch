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
    }

    li {
        font-weight: 600;
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
