import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { useTheme } from 'styled-components/native';
import { LargeList } from 'react-native-largelist';

import AnimeEpisode from '../../../components/AnimeEpisode';
import Text from '../../../components/Text';
import DetailsSkeleton from '../../../components/Skeletons/Details';
import AnimeEpisodeSkeleton from '../../../components/Skeletons/AnimeEpisode';

import { AnimeDetailsRouteParams } from '../../../utils/routes';
import { getHeightBasedOnText } from '../../../utils';

import { getAnimeDetails, getAnimeVideoInfo } from '../../../services/api';
import Storage from '../../../services/storage';

const Details: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [animeHasNoDataAvailable, setAnimeHasNoDataAvailable] = useState(false);
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails>(
    {} as AnimeDetails,
  );
  const [episodes, setEpisodes] = useState<AnimeVideoInfos[]>([]);
  const [history] = useMMKVStorage<HistoryObject[]>(
    Storage.HISTORY_KEY_ID,
    Storage.getStorage(),
  );

  const theme = useTheme();
  const { params } = useRoute<RouteProp<AnimeDetailsRouteParams, 'Anime'>>();

  const screenDim = Dimensions.get('screen');

  useEffect(() => {
    async function run() {
      try {
        const animeDetailsResponse = await getAnimeDetails(params.animeId);
        const animeEpisodesResponse = await getAnimeVideoInfo(params.animeId);

        const validResponse = animeEpisodesResponse?.some(
          ep => ep.location && ep.video_id,
        );

        if (animeDetailsResponse || (animeEpisodesResponse && validResponse)) {
          if (animeDetailsResponse) {
            setAnimeDetails(animeDetailsResponse);
          }

          if (animeEpisodesResponse && validResponse) {
            setEpisodes(animeEpisodesResponse);
          } else {
            setAnimeHasNoDataAvailable(true);
          }
        }

        setLoading(false);
      } catch (err) {
        // TODO: handle animes not found
        console.log(err.message);
        setLoading(false);
      }
    }

    run();
  }, []); // eslint-disable-line

  const handleOpenEpisode = useCallback(toOpenIndex => {
    setEpisodes(prev => {
      const newEpisodeToUpdate = {
        ...prev[toOpenIndex],
        isOpen: !prev[toOpenIndex]?.isOpen,
      };

      const newState = [...prev];
      newState[toOpenIndex] = newEpisodeToUpdate;

      return newState;
    });
  }, []);

  const getItemHeight = useCallback(
    ({ row }) =>
      episodes[row].isOpen
        ? getHeightBasedOnText(episodes[row].title, screenDim) + 50
        : getHeightBasedOnText(episodes[row].title, screenDim),
    [episodes, screenDim],
  );

  const renderItem = useCallback(
    ({ row }) => {
      return (
        <>
          <TouchableOpacity
            onPress={() => handleOpenEpisode(row)}
            activeOpacity={0.75}
            style={{ flexDirection: 'row', marginHorizontal: 40 }}>
            <AnimeEpisode
              key={row}
              episodeId={episodes[row].video_id}
              title={episodes[row].title}
              episodeUrls={[episodes[row].location, episodes[row].sdlocation]}
              isOpen={episodes[row].isOpen}
              watched={history?.some(
                obj => obj.video_id === episodes[row].video_id,
              )}
            />
          </TouchableOpacity>
          <View
            style={{
              width: '75%',
              alignSelf: 'center',
              backgroundColor: theme.primary5,
              height: 1,
              marginTop: 7,
            }}
          />
        </>
      );
    },
    [episodes, history],
  );

  return loading ? (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.primary,
      }}>
      <DetailsSkeleton />
      <View
        style={{
          paddingHorizontal: 40,
          paddingTop: 15,
          alignItems: 'center',
        }}>
        <AnimeEpisodeSkeleton />
      </View>
    </View>
  ) : (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.primary,
        }}>
        <Text
          style={{ fontSize: 24, paddingHorizontal: 35, marginBottom: 35 }}
          font="bold">
          {animeDetails.category_name}
        </Text>
        <View
          style={{
            maxHeight: 130,
            marginBottom: 35,
            paddingHorizontal: 35,
            flexDirection: 'row',
          }}>
          <Image
            source={{
              uri: `https://cdn.appanimeplus.tk/img/${animeDetails.category_image}`,
              headers: {
                'user-agent':
                  'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36',
              },
            }}
            style={{
              width: 130,
              height: 130,
              borderRadius: 15,
              marginRight: 15,
            }}
          />
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              textAlign: 'justify',
              color: `${theme.textPrimary}65`,
              lineHeight: 18,
            }}
            font="default"
            numberOfLines={7}>
            {animeDetails.category_description}
          </Text>
        </View>
        {animeHasNoDataAvailable ? (
          <View
            style={{
              maxHeight: 130,
              marginBottom: 35,
              paddingHorizontal: 70,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                textAlign: 'center',
                color: `${theme.textPrimary}65`,
                lineHeight: 18,
                letterSpacing: 1.5,
              }}
              font="default"
              numberOfLines={7}>
              Esse anime ainda não possui episódios disponíveis ou não foi
              possível recuperar os dados.
            </Text>
          </View>
        ) : (
          <LargeList
            style={{ paddingTop: 15 }}
            data={[{ items: episodes }]}
            heightForIndexPath={getItemHeight}
            renderIndexPath={renderItem}
            renderFooter={() => <View style={{ height: 20 }} />}
            onMoveShouldSetResponder={() => true}
          />
        )}
      </View>
    </>
  );
};

export default React.memo(Details);
