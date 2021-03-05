import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';
import styles from './styles';

const App: React.FC = () => {
  const [theme, setTheme] = useState(styles.themes.darkTheme);

  const changeTheme = () => {
    setTheme(
      theme.name === 'light'
        ? styles.themes.darkTheme
        : styles.themes.lightTheme,
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle={theme.name === 'light' ? 'dark-content' : 'light-content'}
        />
        <Routes changeTheme={changeTheme} />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
