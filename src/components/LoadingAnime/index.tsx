import React, { useContext } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { ThemeContext } from 'styled-components/native';
import { shade } from 'polished';

const LoadingAnime: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <ContentLoader
      style={{ marginRight: 10 }}
      speed={2}
      width={170}
      height={265}
      backgroundColor={
        theme.name === 'dark'
          ? shade(0.05, theme.primaryColor)
          : shade(0.05, theme.secundaryColor)
      }
      foregroundColor={
        theme.name === 'dark'
          ? shade(0.15, theme.primaryColor)
          : shade(0.12, theme.primaryColor)
      }>
      <Rect x="0" y="10" rx="0" ry="0" width="170" height="220" />
      <Rect x="10" y="245" rx="0" ry="0" width="150" height="20" />
    </ContentLoader>
  );
};

export default LoadingAnime;
