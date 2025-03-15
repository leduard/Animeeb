/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { LegendList } from '@legendapp/list';
import AnimeEpisode from '../../../components/AnimeEpisode';
import Text from '../../../components/Text';
import DetailsSkeleton from '../../../components/Skeletons/Details';
import AnimeEpisodeSkeleton from '../../../components/Skeletons/AnimeEpisode';

import { AnimeDetailsRouteParams } from '../../../utils/routes';
import { WebCrypto, config, reverse } from '../../../utils/crypto.js';

import {
  getAnimeDetails,
  getAnimeEpisodes,
  getAnimeVideoInfo,
} from '../../../services/api';
import { getHeightBasedOnText } from '../../../utils';

const Details: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [animeHasNoDataAvailable, setAnimeHasNoDataAvailable] = useState(false);
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails>(
    {} as AnimeDetails,
  );
  const [episodes, setEpisodes] = useState<AnimeEpisode[]>([]);

  const theme = useTheme();
  const { params } = useRoute<RouteProp<AnimeDetailsRouteParams, 'Anime'>>();

  const screenDim = Dimensions.get('screen');

  useEffect(() => {
    async function run() {
      try {
        const animeDetailsResponse = await getAnimeDetails(params.animeId);
        const animeEpisodesResponse = await getAnimeEpisodes(params.animeId);

        const validResponse = animeEpisodesResponse?.some(ep => ep.video_id);

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
        console.log((err as Error).message);
        setLoading(false);
      }
    }

    run();
  }, []); // eslint-disable-line

  const handleOpenEpisode = useCallback((toOpenIndex: number) => {
    let tempEp: AnimeEpisode;
    setEpisodes(prev => {
      const newState = [...prev];
      newState[toOpenIndex] = {
        ...prev[toOpenIndex],
        isOpen: !prev[toOpenIndex]?.isOpen,
      };

      tempEp = newState[toOpenIndex];
      return newState;
    });

    async function getUrlsSetOpen() {
      if (tempEp.location || tempEp.sdlocation) {
        return;
      }

      const videoInfo = await getAnimeVideoInfo(tempEp.video_id);

      let location = videoInfo?.[0].mS9wR2qY7pK7vX5n;
      let sdlocation = videoInfo?.[0].fV3gK5vU7uG6hU5e;

      // i dont know what the fuck is going on here
      // but it works, so i dont care
      if (location) {
        const jwt = location.slice(36, -64);
        let iv = jwt.substring(jwt.length - 64);

        iv = (WebCrypto as any).enc.Utf8.parse(reverse(iv));

        const words = (WebCrypto as any).JWT.decrypt(jwt, config, { iv });
        const urlEnd = (WebCrypto as any).enc.Utf8.stringify(words);

        location = `https://get.atv2.net/m.php${urlEnd.split('m.php')[1]}`;
      }

      if (sdlocation) {
        const jwt = sdlocation.slice(36, -64);
        let iv = jwt.substring(jwt.length - 64);

        iv = (WebCrypto as any).enc.Utf8.parse(reverse(iv));

        const words = (WebCrypto as any).JWT.decrypt(jwt, config, { iv });
        const urlEnd = (WebCrypto as any).enc.Utf8.stringify(words);

        sdlocation = `https://get.atv2.net/m.php${urlEnd.split('m.php')[1]}`;
      }

      setEpisodes(prevEpisodes => {
        const updatedState = [...prevEpisodes];
        updatedState[toOpenIndex] = {
          ...prevEpisodes[toOpenIndex],
          location,
          sdlocation,
        };
        return updatedState;
      });
    }

    getUrlsSetOpen();
  }, []);

  const getItemHeight = useCallback(
    () => getHeightBasedOnText(episodes[0].title, screenDim),
    [episodes, screenDim],
  );

  const renderItem = useCallback(
    (itemData: { index: number }) => {
      return (
        <>
          <TouchableOpacity
            onPress={() => handleOpenEpisode(itemData.index)}
            activeOpacity={0.75}
            style={{ flexDirection: 'row', marginHorizontal: 40 }}>
            <AnimeEpisode
              episodeId={episodes[itemData.index].video_id}
              title={episodes[itemData.index].title}
              episodeUrls={[
                episodes[itemData.index].location || '',
                episodes[itemData.index].sdlocation || '',
              ]}
              isOpen={episodes[itemData.index].isOpen}
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
    [episodes],
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
              uri: `https://cdn.atv2.net/img/${animeDetails.category_image}`,
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
          <View style={{ paddingTop: 15, flex: 1 }}>
            <LegendList
              data={episodes}
              estimatedItemSize={getItemHeight()}
              renderItem={renderItem}
              keyExtractor={item => item.video_id}
              recycleItems
              maintainScrollAtEnd
            />
          </View>
        )}
      </View>
    </>
  );
};

export default React.memo(Details);
