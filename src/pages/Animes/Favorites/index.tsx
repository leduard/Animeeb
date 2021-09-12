import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { useTheme } from 'styled-components/native';

import Text from '../../../components/Text';
import AnimeElement from '../../../components/AnimeElement';

import Storage from '../../../services/storage';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useMMKVStorage<Anime[]>(
    Storage.FAVORITES_KEY_ID,
    Storage.getStorage(),
  );

  const theme = useTheme();

  const handleFavorite = useCallback(
    async (item: Anime) => {
      setFavorites(await Storage.handleFavorites(item));
    },
    [setFavorites],
  );

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
          Meus Favoritos
        </Text>
        <Text
          style={{ fontSize: 14, paddingHorizontal: 35, marginBottom: 10 }}
          font="default">
          Aqui estão os animes que foram favoritados por você
        </Text>

        {favorites?.length ? (
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 35, paddingTop: 15 }}
            data={favorites}
            keyExtractor={() => String(Math.random())}
            renderItem={({ item }) => (
              <AnimeElement
                key={String(Math.random())}
                title={item.category_name}
                cover={item.category_image}
                animeId={item.id}
                isFavorite={favorites?.some(fav => fav.id === item.id)}
                handleFavorite={() => handleFavorite(item)}
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
              Adicione algum anime aos favoritos e ele irá aparecer aqui!
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default Favorites;
