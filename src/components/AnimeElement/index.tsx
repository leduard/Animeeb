import React, { useState, useCallback, useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { lighten } from 'polished';

import { ANIME_ROUTES_NAMES } from '../../utils/routes';

import Text from '../Text';

import FilledHeartIcon from '../../assets/icons/heart_filled.svg';

interface AnimeElementProps {
  animeId: string;
  title: string;
  cover: string;
  isFavorite: boolean;
  handleFavorite(): void;
}

const AnimeElement: React.FC<AnimeElementProps> = ({
  title,
  cover,
  animeId,
  isFavorite,
  handleFavorite,
}) => {
  const theme = useTheme();

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ANIME_ROUTES_NAMES.details, {
          title,
          cover,
          animeId,
          isFavorite,
        });
      }}
      activeOpacity={0.85}
      style={{
        width: '97%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
      }}>
      <Image
        source={{
          uri: `https://cdn.atv2.net/img/${cover}`,
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
      <Text
        style={{ width: '50%', fontSize: 14, letterSpacing: 0.5 }}
        font="medium"
        numberOfLines={4}>
        {title}
      </Text>
      <TouchableOpacity
        activeOpacity={0.65}
        style={{ alignSelf: 'flex-start' }}
        onPress={handleFavorite}>
        <FilledHeartIcon
          color={isFavorite ? theme.error : lighten(0.1, theme.primary5)}
          width={25}
          height={25}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default React.memo(AnimeElement);
