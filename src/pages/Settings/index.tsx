import React, { useCallback } from 'react';
import { View, Switch, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import Text from '../../components/Text';

import Arrow from '../../assets/icons/arrow.svg';

import { ANIME_ROUTES_NAMES } from '../../utils/routes';

import Storage from '../../services/storage';

interface SettingsProps {
  changeTheme(): void;
}

const Settings: React.FC<SettingsProps> = ({ changeTheme }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleClearStorage = useCallback(() => {
    Alert.alert(
      'Apagar todos os dados?',
      'Você está prestes a apagar todos os dados do aplicativo, deseja continuar?',
      [
        {
          style: 'default',
          text: 'Sim',
          onPress: () => Storage.clearStorage(),
        },
        {
          style: 'cancel',
          text: 'Não',
        },
      ],
    );

    // TODO: clear cached images
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.primary,
        paddingHorizontal: 35,
      }}>
      <Text style={{ fontSize: 24, marginBottom: -5 }} font="bold">
        Configurações
      </Text>
      <Text style={{ fontSize: 14, marginBottom: 30 }} font="default">
        Página de ajustes e gerenciamento do armazenamento da aplicação
      </Text>

      <View style={{ paddingHorizontal: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 30,
          }}>
          <Text style={{ fontSize: 18, lineHeight: 28 }} font="medium">
            Modo escuro
          </Text>
          <Switch
            trackColor={{
              false: theme.primary5,
              true: theme.success,
            }}
            thumbColor={theme.textPrimary}
            ios_backgroundColor="#3e3e3e"
            onValueChange={changeTheme}
            value={theme.name === 'dark'}
          />
        </View>

        <View
          style={{
            backgroundColor: theme.primary5,
            height: 1,
            width: '100%',
            marginVertical: 15,
          }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate(ANIME_ROUTES_NAMES.history)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 30,
          }}>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 28,
              color: theme.textPrimary,
            }}
            font="medium">
            Histórico de visualização
          </Text>
          <Arrow
            color={theme.textPrimary}
            rotation={270}
            width={30}
            height={30}
          />
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: theme.primary5,
            height: 1,
            width: '100%',
            marginVertical: 15,
          }}
        />

        <TouchableOpacity
          onPress={handleClearStorage}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 30,
          }}>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 28,
              color: theme.textPrimary,
            }}
            font="medium">
            Apagar todos os dados
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
