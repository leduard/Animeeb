export interface ThemeColors {
  name: string;

  primary: string;
  primary2: string;
  primary3: string;
  primary4: string;
  primary5: string;
  secondary: string;
  error: string;
  warn: string;
  success: string;

  textPrimary: string;
  textSecondary: string;
}

export default {
  colors: {
    light: {
      name: 'light',

      primary: '#FFFFFF',
      primary2: '#FAFAFA',
      primary3: '#F5F5F5',
      primary4: '#F0F0F0',
      primary5: '#BBBBBB',
      secondary: '#2934D0',
      error: '#ED2E7E',
      warn: '#F4B740',
      success: '#00BA88',

      textPrimary: '#151529',
      textSecondary: '#15152999',
    },
    dark: {
      name: 'dark',

      primary: '#191A32',
      primary2: '#151529',
      primary3: '#202038',
      primary4: '#2A2A42',
      primary5: '#32324D',
      secondary: '#33E6F6',
      error: '#ED2E7E',
      warn: '#F4B740',
      success: '#00BA88',

      textPrimary: '#FFFFFF',
      textSecondary: '#ADAFBB99',
    },
  },
};
