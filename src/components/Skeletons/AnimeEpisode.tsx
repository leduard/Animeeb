import React, { useContext } from 'react';
import { View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { ThemeContext } from 'styled-components/native';

const AnimeEpisodeSkeleton: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <View style={{ width: '100%' }}>
      <ContentLoader
        speed={2}
        width={310}
        height={64}
        backgroundColor={
          theme.name === 'light' ? theme.primary2 : theme.primary3
        }
        foregroundColor={
          theme.name === 'light' ? theme.primary4 : theme.primary
        }
        style={{ marginBottom: 10, paddingHorizontal: 40 }}>
        <Rect x="0" y="0" rx="0" ry="0" width="2" height="100%" />
        <Rect x="19" y="15" rx="2" ry="2" width="65%" height="15" />
        <Rect x="19" y="34" rx="2" ry="2" width="25%" height="15" />
        <Rect
          x="305"
          y="10"
          rx="0"
          ry="0"
          width="20"
          height="20"
          transform={{ x: -35 }}
        />
      </ContentLoader>
    </View>
  );
};

export default React.memo(AnimeEpisodeSkeleton);
