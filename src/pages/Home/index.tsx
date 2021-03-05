import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View } from 'react-native';
import { ThemeContext } from 'styled-components/native';

import Background from '~/components/Background';
import { PageTitle } from '~/components/Text';
import LoadingAnime from '~/components/LoadingAnime';

import AnimeComponent from '~/components/AnimeComponent';

import { getLatest, getPopular } from '~/services/api';

const Home: React.FC = () => {
  const theme = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [latestAnimeEpisodes, setLatestAnimeEpisodes] = useState<
    LatestAnimeEpisode[]
  >([]);
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);

  useEffect(() => {
    async function start() {
      const latestEpisodes = await getLatest();
      const popularAnimes = await getPopular();

      setLatestAnimeEpisodes(latestEpisodes || []);
      setPopularAnime(popularAnimes || []);
      setLoading(false);
    }

    start();
  }, []);

  return (
    <Background>
      <View>
        <PageTitle style={{ padding: 15, fontSize: 20 }}>
          Novos episódios
        </PageTitle>

        <FlatList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          style={{
            flexGrow: 0,
            height: 270,
            backgroundColor: theme.secundaryColor,
          }}
          data={loading ? new Array(3) : latestAnimeEpisodes}
          keyExtractor={(item) =>
            loading ? Math.random().toString() : item?.video_id
          }
          horizontal
          renderItem={({ item }) => {
            if (['1', '2'].indexOf(item?.category_id) === -1) {
              return loading ? (
                <LoadingAnime />
              ) : (
                <AnimeComponent
                  videoId={item?.video_id}
                  title={item?.title}
                  cover={item?.category_image}
                  isNewEpisode
                />
              );
            }
            return null;
          }}
        />
      </View>

      <View>
        <PageTitle style={{ padding: 15, fontSize: 20 }}>
          Mais populares
        </PageTitle>

        <FlatList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          style={{
            flexGrow: 0,
            height: 270,
            backgroundColor: theme.secundaryColor,
          }}
          data={loading ? new Array(3) : popularAnime}
          keyExtractor={(item) =>
            loading ? Math.random().toString() : item?.id
          }
          horizontal
          renderItem={({ item }) => {
            if (['1', '2'].indexOf(item?.category_id) === -1) {
              return loading ? (
                <LoadingAnime />
              ) : (
                <AnimeComponent
                  title={item?.category_name}
                  cover={item?.category_image}
                  animeId={item?.id}
                  isAnime
                />
              );
            }
            return null;
          }}
        />
      </View>
    </Background>
  );
};

export default Home;
