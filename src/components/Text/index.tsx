import styled from 'styled-components/native';

export const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

export const PageTitle = styled(Text)`
  font-size: 20px;
`;
