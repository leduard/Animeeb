import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { shade } from 'polished';

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
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AnimeRouteParams, 'Anime'>>();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    async function start() {
      setLoading(true);
      const animeDetailsResponse = await getAnimeDetails(params.animeId);
      const animeEpisodes = await getAnimeEpisodes(params.animeId);

      setEpisodes(animeEpisodes || []);
      setAnimeDetails(animeDetailsResponse || ({} as AnimeDetails));
      setLoading(false);
    }

    start();
  }, []);

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
              }}>
              {animeDetails.category_genres.split(', ').map((item) => (
                <CategoryContainer
                  onPress={() => {
                    const category = global.categories.find(
                      (value) => value.displayName === item,
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
