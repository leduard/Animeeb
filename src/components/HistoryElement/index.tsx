import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { ANIME_ROUTES_NAMES } from '../../utils/routes';

import Text from '../Text';

interface HistoryElementProps {
  animeTitle: string;
  animeCover: string;
  episodeTitle: string;
}

const HistoryElement: React.FC<HistoryElementProps> = ({
  animeTitle,
  animeCover,
  episodeTitle,
}) => {
  const [episode] = useState(episodeTitle.match(/epis(o|ó)dio\s(.*)$/i));

  return (
    <View
      style={{
        width: '97%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
      }}>
      <Image
        source={{
          uri: `https://cdn.appanimeplus.tk/img/${animeCover}`,
          headers: {
            'user-agent':
              'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36',
          },
        }}
        style={{
          width: 90,
          height: 90,
          borderRadius: 15,
        }}
      />
      <View style={{ flex: 1, height: '100%', paddingLeft: 10 }}>
        <Text
          style={{ fontSize: 18, letterSpacing: 0.5 }}
          font="medium"
          numberOfLines={2}>
          {animeTitle}
        </Text>
        <Text
          style={{ fontSize: 14, letterSpacing: 0.5 }}
          font="light"
          numberOfLines={4}>
          {episode?.length ? episode[0] : ''}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(HistoryElement);
