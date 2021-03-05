import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import _AnimeComponent from '~/components/AnimeComponent';

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  color: ${(props) => props.theme.textColor};
  padding: 10px 55px 10px 35px;
  font-size: 18px;
`;

export const SearchInputClear = styled(RectButton)`
  position: absolute;
  right: 15px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background: #ffffff00;
  border-radius: 15px;
`;

export const AnimeComponent = styled(_AnimeComponent)`
  margin: 2px;
  background: ${(props) => props.theme.secundaryColor};
  border-radius: 5px;
`;

export const NotFoundContainer = styled.View`
  margin-top: 45%;

  align-items: center;
`;
