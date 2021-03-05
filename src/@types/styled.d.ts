import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    name: string;

    primaryColor: string;
    secundaryColor: string;
    textColor: string;
  }
}
