import React, { useState, useCallback, useContext } from 'react';
import { View, Switch, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import { shade, lighten } from 'polished';

import Background from '~/components/Background';
import { PageTitle, Text } from '~/components/Text';

import global from '~/global';

interface SettingsProps {
  changeTheme(): void;
}

const Settings: React.FC<SettingsProps> = ({ changeTheme }) => {
  const [history, setHistory] = useState([]);

  const theme = useContext(ThemeContext);

  useFocusEffect(() => {
    async function run() {
      const loadedHistory = await AsyncStorage.getItem(
        global.storageKeys.history,
      );

      const parsedLoadedHistory = JSON.parse(loadedHistory || '[]');

      setHistory(parsedLoadedHistory);
    }

    run();
  });

  const clearHistory = useCallback(async () => {
    Alert.alert(
      'Apagar histórico?',
      `Deseja realmente apagar o histórico de visualização?`,
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await AsyncStorage.removeItem(global.storageKeys.history);
            setHistory([]);
          },
        },
      ],
    );
  }, []);

  return (
    <Background>
      <PageTitle style={{ padding: 15, fontSize: 20 }}>Ajustes</PageTitle>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ padding: 15, fontSize: 18 }}>Modo escuro</Text>
        <Switch
          trackColor={{
            false: shade(0.5, theme.secundaryColor),
            true: lighten(0.5, theme.secundaryColor),
          }}
          thumbColor={
            theme.name === 'dark'
              ? lighten(0.9, theme.primaryColor)
              : shade(0.7, theme.primaryColor)
          }
          ios_backgroundColor="#3e3e3e"
          onValueChange={changeTheme}
          value={theme.name === 'dark'}
        />
      </View>
      {!!history.length && (
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <RectButton
            style={{
              backgroundColor: theme.secundaryColor,
              borderRadius: 5,
            }}
            onPress={clearHistory}>
            <Text style={{ padding: 15, fontSize: 18 }}>
              Apagar histórico de visualização
            </Text>
          </RectButton>
        </View>
      )}
    </Background>
  );
};

export default Settings;
