import styled from 'styled-components';

export const InstrumentHeader = styled.div`
    h1 {
        span {
            color: ${({ theme }) => theme.colors.blue};
            text-transform: uppercase;
            font-weight: 700;
        }
    }
`;
