import React, { useContext } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { ThemeContext } from 'styled-components/native';

const AnimeElementSkeleton: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <ContentLoader
      speed={2}
      width={330}
      height={90}
      backgroundColor={theme.name === 'light' ? theme.primary2 : theme.primary3}
      foregroundColor={theme.name === 'light' ? theme.primary4 : theme.primary}
      style={{ marginBottom: 10 }}>
      <Rect x="0" y="0" rx="15" ry="15" width="90" height="90" />
      <Rect x="110" y="30" rx="2" ry="2" width="160" height="15" />
      <Rect x="110" y="50" rx="2" ry="2" width="160" height="15" />
      <Rect
        x="305"
        y="5"
        rx="0"
        ry="0"
        width="25"
        height="25"
        transform={{ x: -16 }}
      />
    </ContentLoader>
  );
};

export default React.memo(AnimeElementSkeleton);
