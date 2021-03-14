import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, FlatList, ScrollView, ToastAndroid } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { shade } from 'polished';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Background from '~/components/Background';
import AnimeComponent from '~/components/AnimeComponent';

import global from '~/global';

import {
  AnimeContainer,
  AnimeText,
  DescriptionText,
  CategoryContainer,
  CategoryText,
  AnimeDataContainer,
  Cover,
  AnimeTitle,
  FavoriteIcon,
  FavoriteIconContainer,
} from './styles';

import { getAnimeDetails, getAnimeEpisodes } from '~/services/api';

const LoadingAnime: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <ContentLoader
      speed={2}
      width={400}
      height={500}
      viewBox="0 0 400 500"
      backgroundColor={
        theme.name === 'dark'
          ? shade(0.05 + 0.1, theme.primaryColor)
          : shade(0.05, theme.secundaryColor)
      }
      foregroundColor={
        theme.name === 'dark'
          ? shade(0.15 + 0.25, theme.primaryColor)
          : shade(0.12, theme.primaryColor)
      }>
      <Rect x="20" y="10" rx="0" ry="0" width="150" height="200" />
      <Rect x="180" y="20" rx="0" ry="0" width="185" height="10" />
      <Rect x="180" y="35" rx="0" ry="0" width="185" height="10" />
      <Rect x="180" y="50" rx="0" ry="0" width="185" height="10" />
      <Rect x="180" y="65" rx="0" ry="0" width="185" height="10" />
      <Rect x="180" y="80" rx="0" ry="0" width="185" height="10" />
      <Rect x="180" y="95" rx="0" ry="0" width="185" height="10" />
      <Rect x="10" y="235" rx="5" ry="5" width="373" height="40" />
      <Rect x="10" y="277" rx="5" ry="5" width="373" height="40" />
      <Rect x="10" y="319" rx="5" ry="5" width="373" height="40" />
    </ContentLoader>
  );
};

const Anime: React.FC = () => {
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails>(
    {} as AnimeDetails,
  );
  const [episodes, setEpisodes] = useState<AnimeEpisode[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AnimeRouteParams, 'Anime'>>();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    async function start() {
      setLoading(true);
      const animeDetailsResponse = await getAnimeDetails(params.animeId);
      const animeEpisodes = await getAnimeEpisodes(params.animeId);

      const loadedFavAnimes = await AsyncStorage.getItem(
        global.storageKeys.favorites,
      );

      if (loadedFavAnimes) {
        const parsedFavAnimes = JSON.parse(loadedFavAnimes);

        setIsFavorite(
          parsedFavAnimes.find((anime: Anime) => anime.id === params.animeId),
        );
      }

      setEpisodes(animeEpisodes || []);
      setAnimeDetails(animeDetailsResponse || ({} as AnimeDetails));
      setLoading(false);
    }

    start();
  }, []);

  const handleFavorite = useCallback(async () => {
    const loadedFavAnimes = await AsyncStorage.getItem(
      global.storageKeys.favorites,
    );

    const parsedFavAnimes = JSON.parse(loadedFavAnimes || '[]');

    if (isFavorite) {
      const newFavorites = parsedFavAnimes.filter(
        (anime: Anime) => anime.id !== params.animeId,
      );

      await AsyncStorage.setItem(
        global.storageKeys.favorites,
        JSON.stringify(newFavorites),
      );

      setIsFavorite(false);
      ToastAndroid.show('Anime removido dos favoritos', ToastAndroid.SHORT);
    } else {
      await AsyncStorage.setItem(
        global.storageKeys.favorites,
        JSON.stringify([...parsedFavAnimes, animeDetails]),
      );

      setIsFavorite(true);
      ToastAndroid.show('Anime adicionado aos favoritos', ToastAndroid.SHORT);
    }
  }, [isFavorite, params.animeId, animeDetails]);

  return (
    <Background>
      <View style={{ paddingHorizontal: 20 }}>
        <AnimeTitle>{params.title}</AnimeTitle>
      </View>
      {loading ? (
        <LoadingAnime />
      ) : (
        <>
          <View style={{ paddingHorizontal: 10 }}>
            <AnimeDataContainer>
              <FavoriteIconContainer
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="favorite-outline"
                  size={45}
                  style={{
                    position: 'absolute',
                    marginLeft: -6,
                    zIndex: 0,
                  }}
                />
                {isFavorite ? (
                  <Icon
                    name="favorite"
                    size={40}
                    color="#DA2F3A"
                    onPress={() => {
                      handleFavorite();
                    }}
                  />
                ) : (
                  <Icon
                    name="favorite"
                    size={40}
                    color="#efeff1"
                    onPress={() => {
                      handleFavorite();
                    }}
                  />
                )}
              </FavoriteIconContainer>

              <Cover
                source={{ uri: `${global.imagesBaseUrl}/${params.cover}` }}
              />
              <ScrollView
                contentContainerStyle={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                style={{ height: 200 }}>
                <DescriptionText>
                  {animeDetails.category_description}
                </DescriptionText>
              </ScrollView>
            </AnimeDataContainer>
            <ScrollView
              horizontal
              style={{ alignSelf: 'center' }}
              contentContainerStyle={{
                justifyContent: 'space-evenly',
                paddingVertical: 5,
              }}>
              {animeDetails.category_genres.split(', ').map((item) => (
                <CategoryContainer
                  key={item}
                  enabled={
                    !!global.categories.find(
                      (value) =>
                        value.displayName.toLocaleLowerCase() ===
                        item.toLocaleLowerCase(),
                    )
                  }
                  onPress={() => {
                    const category = global.categories.find(
                      (value) =>
                        value.displayName.toLocaleLowerCase() ===
                        item.toLocaleLowerCase(),
                    );

                    navigation.navigate('Search', {
                      category: category?.searchName,
                    });
                  }}>
                  <CategoryText>{item}</CategoryText>
                </CategoryContainer>
              ))}
            </ScrollView>
          </View>
          <FlatList
            contentContainerStyle={{ padding: 10 }}
            data={episodes}
            keyExtractor={(item) => item.video_id}
            renderItem={({ item }) => (
              <AnimeComponent
                title={item.title}
                videoId={item.video_id}
                isNormalEpisode
              />
            )}
          />
        </>
      )}
    </Background>
  );
};

export default Anime;
