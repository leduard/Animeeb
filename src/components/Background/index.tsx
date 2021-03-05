import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default styled.View`
  flex: 1;
  padding-top: ${getStatusBarHeight()}px;
  background: ${(props) => props.theme.primaryColor};
`;
