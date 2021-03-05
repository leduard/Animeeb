import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { PageTitle, Text } from '~/components/Text';

export const Container = styled(RectButton).attrs({
  rippleColor: '#888',
})`
  width: 180px;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 10px 0 10px;
  margin: 0 1px;
`;

export const TitleContainer = styled.View`
  padding: 10px;
  height: 45px;
  justify-content: center;
`;

export const Title = styled(Text)`
  font-size: 12px;
  text-align: justify;
`;

export const Cover = styled.Image`
  height: 210px;

  aspect-ratio: 0.75;
`;

export const VideoLinkButton = styled.TouchableOpacity`
  margin: 5px;
  padding: 20px;
  height: 30px;
  background: ${(props) => props.theme.primaryColor};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const NormalAnimeEpisodeContainer = styled(RectButton).attrs({
  rippleColor: '#888',
})`
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  margin: 2px 0;
  background: ${(props) => props.theme.secundaryColor};
  border-radius: 5px;
`;

export const NormalAnimeEpisodeText = styled(PageTitle)`
  text-align: center;
  font-size: 16px;
`;
