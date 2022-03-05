import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';

import Text from '../Text';
import EpisodeQualityButton from './EpisodeQualityButton';

import ArrowIcon from '../../assets/icons/arrow.svg';

interface AnimeEpisodeProps {
  title: string;
  episodeId: string;
  episodeUrls: string[];
  isOpen?: boolean;
  watched?: boolean;
}

const AnimeEpisode: React.FC<AnimeEpisodeProps> = ({
  title,
  episodeId,
  episodeUrls,
  isOpen,
  watched,
}) => {
  const theme = useTheme();

  return (
    <>
      <View
        style={[
          {
            height: '100%',
            width: 2,
            borderRadius: 15,
            backgroundColor: watched ? theme.success : theme.error,
          },
        ]}
      />
      <View
        style={{
          height: isOpen ? '100%' : undefined,
          paddingVertical: 10,
          flexDirection: 'column',
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              width: '90%',
              fontSize: 14,
              letterSpacing: 0.5,
              alignSelf: 'flex-start',
            }}
            textBreakStrategy="balanced"
            font="medium"
            numberOfLines={3}>
            {title}
          </Text>
          <ArrowIcon
            style={{ alignSelf: 'flex-start' }}
            color={theme.textPrimary}
            rotation={isOpen ? 180 : 0}
          />
        </View>
        {isOpen && (
          <View
            style={[
              {
                marginTop: 20,
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
              },
            ]}>
            <EpisodeQualityButton
              episodeTitle={title}
              episodeId={episodeId}
              qualityTitle="SD"
              episodeUrl={episodeUrls[0]}
            />
            <EpisodeQualityButton
              episodeTitle={title}
              episodeId={episodeId}
              qualityTitle="HD"
              episodeUrl={episodeUrls[1]}
            />
            <EpisodeQualityButton
              episodeTitle={title}
              episodeId={episodeId}
              qualityTitle="Full HD"
              episodeUrl={undefined}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default React.memo(AnimeEpisode);
