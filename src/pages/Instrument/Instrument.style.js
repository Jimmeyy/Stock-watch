import styled from 'styled-components';

export const InstrumentHeader = styled.div`
    h1 {
        margin-bottom: 30px;

        span {
            color: ${({ theme }) => theme.colors.blue};
            text-transform: uppercase;
            font-weight: 700;
        }
    }
`;
