import styled, { css } from 'styled-components';

const Heading = styled.h2`
    font-size: 40px;
    color: ${({ theme, dark }) => (dark ? theme.colors.black : theme.colors.white)};
    font-weight: 800;

    ${({ small }) =>
        small &&
        css`
            font-size: 26px;
            font-weight: 700;
            text-transform: uppercase;
            color: ${({ theme }) => theme.colors.blue};
        `};
`;

export default Heading;
