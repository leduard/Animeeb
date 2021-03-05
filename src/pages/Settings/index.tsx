import React, { useContext } from 'react';
import { View, Switch } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { shade, lighten } from 'polished';

import Background from '~/components/Background';
import { PageTitle, Text } from '~/components/Text';

interface SettingsProps {
  changeTheme(): void;
}

const Settings: React.FC<SettingsProps> = ({ changeTheme }) => {
  const theme = useContext(ThemeContext);

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
    </Background>
  );
};

export default Settings;
