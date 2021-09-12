import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import Routes from './routes';

import { theme } from './styles';

import Storage from './services/storage';

Storage.getStorage();

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(theme.colors.dark);

  useEffect(() => {
    async function start() {
      const savedThemeName = await Storage.getStorage().getStringAsync(
        Storage.THEME_KEY_ID,
      );

      if (savedThemeName) {
        setCurrentTheme(
          savedThemeName === 'dark' ? theme.colors.dark : theme.colors.light,
        );
      }

      // TODO
      // SplashScreen.hide();
    }

    start();
  }, []);

  const changeTheme = useCallback(async () => {
    setCurrentTheme(
      currentTheme.name === 'dark' ? theme.colors.light : theme.colors.dark,
    );

    Storage.getStorage().setString(
      Storage.THEME_KEY_ID,
      currentTheme.name === 'light' ? 'dark' : 'light',
    );
  }, [currentTheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <StatusBar backgroundColor={currentTheme.primary} />
      <NavigationContainer>
        <Routes changeTheme={changeTheme} />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
