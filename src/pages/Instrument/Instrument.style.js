import styled from 'styled-components';

export const InstrumentHeader = styled.div`
    display: flex;

    h1 {
        margin: 0 0 30px 30px;

        span {
            color: ${({ theme }) => theme.colors.blue};
            text-transform: uppercase;
            font-weight: 700;
        }
    }
`;
