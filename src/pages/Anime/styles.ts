import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { PageTitle, Text } from '~/components/Text';

export const AnimeDataContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  padding: 10px;
`;

export const AnimeTitle = styled(PageTitle)`
  padding: 15px 0px;
  text-align: center;
`;

export const Cover = styled.Image`
  height: 200px;

  aspect-ratio: 0.75;
`;

export const DescriptionText = styled(Text)`
  font-size: 14px;
  text-align: justify;
`;

export const AnimeContainer = styled(RectButton).attrs({
  rippleColor: '#888',
})`
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  margin: 2px 0;
  background: ${(props) => props.theme.secundaryColor};
  border-radius: 5px;
`;

export const AnimeText = styled(PageTitle)`
  text-align: center;
  font-size: 16px;
`;
