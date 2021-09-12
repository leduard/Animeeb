import React, { useContext } from 'react';
import { View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { ThemeContext } from 'styled-components/native';

const DetailsSkeleton: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <View style={{ paddingHorizontal: 35, marginTop: 6 }}>
      <ContentLoader
        speed={2}
        width="100%"
        height={225}
        backgroundColor={
          theme.name === 'light' ? theme.primary2 : theme.primary3
        }
        foregroundColor={
          theme.name === 'light' ? theme.primary4 : theme.primary
        }
        style={{ marginBottom: 10 }}>
        <Rect x="0" y="0" rx="2" ry="2" width="100%" height="30" />
        <Rect x="0" y="70.5" rx="15" ry="15" width="130" height="130" />
        <Rect x="145" y="70.5" rx="2" ry="2" width="55%" height="15" />
        <Rect x="145" y="90.5" rx="2" ry="2" width="55%" height="15" />
        <Rect x="145" y="110.5" rx="2" ry="2" width="55%" height="15" />
        <Rect x="145" y="130.5" rx="2" ry="2" width="55%" height="15" />
        <Rect x="145" y="150.5" rx="2" ry="2" width="55%" height="15" />
        <Rect x="145" y="170.5" rx="2" ry="2" width="25%" height="15" />
      </ContentLoader>
    </View>
  );
};

export default React.memo(DetailsSkeleton);
