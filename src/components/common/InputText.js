import styled from 'styled-components';

const InputText = styled.input`
    border: 0;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    height: 40px;
    padding: 0 15px;
    min-width: 230px;
`;

export default InputText;
