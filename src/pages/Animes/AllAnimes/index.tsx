import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { useTheme } from 'styled-components/native';

import Text from '../../../components/Text';
import AnimeElement from '../../../components/AnimeElement';

import { getAllAnimes } from '../../../services/api';
import Storage from '../../../services/storage';

import { fonts } from '../../../styles';

const Popular: React.FC = () => {
  const [allAnimes, setAllAnimes] = useState<Anime[]>([]);
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useMMKVStorage<Anime[]>(
    Storage.FAVORITES_KEY_ID,
    Storage.getStorage(),
  );

  const theme = useTheme();

  useEffect(() => {
    async function run() {
      try {
        const animes = await getAllAnimes();

        if (!animes)
          throw new Error(
            'Não foi possível fazer a busca por novos animes, tente novamente mais tarde',
          );

        setAllAnimes(animes);
      } catch (err) {
        // TODO: handle animes not found
        console.log(err.message);
      }
    }

    run();
  }, []);

  const handleFavorite = useCallback(
    async (item: Anime) => {
      setFavorites(await Storage.handleFavorites(item));
    },
    [setFavorites],
  );

  const filterAnimesBySearchText = useCallback(
    newSearchText => {
      setSearchText(newSearchText);

      const filterRegex = new RegExp(newSearchText, 'i');

      setFilteredAnimes(
        allAnimes.filter(anime => filterRegex.test(anime.category_name)),
      );
      setIsFilterActive(true);
    },
    [allAnimes],
  );

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.primary,
        }}>
        <Text
          style={{ fontSize: 24, marginBottom: -5, paddingHorizontal: 35 }}
          font="bold">
          Animes
        </Text>
        <Text
          style={{ fontSize: 14, marginBottom: 10, paddingHorizontal: 35 }}
          font="default">
          Essa é a lista completa de todos os animes disponíveis
        </Text>

        <TextInput
          style={{
            fontFamily: fonts.default,
            fontSize: 14,
            marginHorizontal: 45,
            paddingVertical: 0,
            borderBottomColor: theme.primary5,
            borderBottomWidth: 1,
            marginBottom: 5,
          }}
          autoCorrect={false}
          textContentType="name"
          placeholder="Pesquisar..."
          placeholderTextColor={`${theme.textPrimary}70`}
          selectionColor={theme.textPrimary}
          value={searchText}
          onChangeText={newValue => filterAnimesBySearchText(newValue)}
          returnKeyType="send"
        />

        <FlatList
          contentContainerStyle={{ paddingTop: 15, paddingHorizontal: 35 }}
          data={!isFilterActive ? allAnimes : filteredAnimes}
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
      </View>
    </>
  );
};

export default Popular;
