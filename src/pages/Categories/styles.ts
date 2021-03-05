import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Text } from '~/components/Text';

export const CategoryContainer = styled(RectButton).attrs({
  rippleColor: '#888',
})`
  flex: 1;
  height: 50px;
  justify-content: center;
  margin: 5px;

  background: ${(props) => props.theme.secundaryColor};
  border-radius: 5px;
`;

export const CategoryName = styled(Text)`
  padding: 5px;
  font-size: 16px;
  text-align: center;
`;
