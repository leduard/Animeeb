import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { useTheme } from 'styled-components/native';
import { lighten } from 'polished';

import Text from '../../../components/Text';
import AnimeElement from '../../../components/AnimeElement';
import AnimeElementSkeleton from '../../../components/Skeletons/AnimeElement';

import { getLatest } from '../../../services/api';
import Storage from '../../../services/storage';

const Home: React.FC = () => {
  const [latestAnimes, setLatestAnimes] = useState<LatestAnimeEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [favorites, setFavorites] = useMMKVStorage<Anime[]>(
    Storage.FAVORITES_KEY_ID,
    Storage.getStorage(),
  );

  const theme = useTheme();

  const getAnimes = useCallback(async () => {
    try {
      const animes = await getLatest();

      if (!animes)
        throw new Error(
          'Não foi possível fazer a busca por novos animes, tente novamente mais tarde',
        );

      setLatestAnimes(animes);
      setLoading(false);
    } catch (err) {
      // TODO: handle animes not found
      console.log(err.message);
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);

    await getAnimes();

    setIsRefreshing(false);
  }, [getAnimes]);

  const handleFavorite = useCallback(
    async (item: LatestAnimeEpisode) => {
      const currentAnime = {
        category_image: item.category_image,
        category_name: item.title.replace(/\sepis(o|ó)dio\s(.*)$/i, ''),
        id: item.category_id,
      };
      setFavorites(await Storage.handleFavorites(currentAnime));
    },
    [setFavorites],
  );

  useEffect(() => {
    getAnimes();
  }, [getAnimes]);

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
          Novos Episódios
        </Text>
        <Text
          style={{ fontSize: 14, paddingHorizontal: 35, marginBottom: 10 }}
          font="default">
          Episódios que foram recentemente lançados no app
        </Text>

        {loading ? (
          <View style={{ paddingHorizontal: 35, paddingTop: 15 }}>
            <AnimeElementSkeleton />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 35, paddingTop: 15 }}
            data={latestAnimes}
            keyExtractor={() => String(Math.random())}
            renderItem={({ item }) => (
              <AnimeElement
                key={String(Math.random())}
                title={item.title}
                cover={item.category_image}
                animeId={item.category_id}
                isFavorite={favorites?.some(fav => fav.id === item.category_id)}
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
            refreshControl={
              <RefreshControl
                colors={[theme.textPrimary]}
                progressBackgroundColor={lighten(0.05, theme.primary5)}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        )}
      </View>
    </>
  );
};

export default Home;
