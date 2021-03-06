import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

import Routes from './routes';
import styles from './styles';

const App: React.FC = () => {
  const [theme, setTheme] = useState(styles.themes.darkTheme);

  useEffect(() => {
    async function start() {
      const savedThemeName = await AsyncStorage.getItem('@animeapp:theme');

      if (savedThemeName) {
        setTheme(
          savedThemeName === 'dark'
            ? styles.themes.darkTheme
            : styles.themes.lightTheme,
        );
      }

      SplashScreen.hide();
    }

    start();
  }, []);

  const changeTheme = async () => {
    setTheme(
      theme.name === 'light'
        ? styles.themes.darkTheme
        : styles.themes.lightTheme,
    );

    await AsyncStorage.setItem(
      '@animeapp:theme',
      theme.name === 'light' ? 'dark' : 'light',
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
