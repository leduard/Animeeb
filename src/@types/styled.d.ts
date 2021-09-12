import 'styled-components/native';
import { ThemeColors } from '../styles/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeColors {}
}
