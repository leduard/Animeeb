import React, { useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { useTheme } from 'styled-components/native';

import Text from '../../../components/Text';
import HistoryElement from '../../../components/HistoryElement';

import Storage from '../../../services/storage';

const Favorites: React.FC = () => {
  const [history] = useMMKVStorage<HistoryObject[]>(
    Storage.HISTORY_KEY_ID,
    Storage.getStorage(),
  );

  const theme = useTheme();

  const handleClearHistory = useCallback(() => {
    Alert.alert(
      'Apagar todo o histórico?',
      'Você está prestes a apagar todo seu histórico de visualização, deseja continuar?',
      [
        {
          style: 'default',
          text: 'Sim',
          onPress: () =>
            Storage.getStorage().removeItem(Storage.HISTORY_KEY_ID),
        },
        {
          style: 'cancel',
          text: 'Não',
        },
      ],
    );
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.primary,
        }}>
        <Text
          style={{ fontSize: 24, paddingHorizontal: 35, marginBottom: -5 }}
          font="bold">
          Histórico de visualização
        </Text>
        <Text style={{ fontSize: 14, paddingHorizontal: 35 }} font="default">
          Todos os episódios de animes assistidos por você
        </Text>

        {history?.length && (
          <TouchableOpacity
            style={{
              marginHorizontal: 40,
              marginVertical: 20,
              backgroundColor: theme.error,
              borderRadius: 10,
              height: 35,
              alignItems: 'center',
            }}
            onPress={handleClearHistory}>
            <Text style={{ lineHeight: 38 }} font="medium">
              Apagar histórico de visualização
            </Text>
          </TouchableOpacity>
        )}

        {history?.length ? (
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 35, paddingTop: 15 }}
            data={history}
            keyExtractor={() => String(Math.random())}
            renderItem={({ item }) => (
              <HistoryElement
                key={String(Math.random())}
                animeCover={item.anime_cover}
                animeTitle={item.anime_title}
                episodeTitle={item.video_title}
              />
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  backgroundColor: theme.primary5,
                  height: 1,
                  width: '100%',
                  marginBottom: 10,
                }}
              />
            )}
          />
        ) : (
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              paddingHorizontal: 50,
            }}>
            <Text style={{ textAlign: 'center' }}>
              Você ainda não assistiu nenhum vídeo no aplicativo
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default Favorites;
