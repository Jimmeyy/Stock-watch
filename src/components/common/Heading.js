import styled from 'styled-components';

const Heading = styled.h2`
    font-size: 40px;
    color: ${({ theme, dark }) => (dark ? theme.colors.black : theme.colors.white)};
    font-weight: 800;
`;

export default Heading;
