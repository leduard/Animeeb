declare module '@env' {
  export const DEFAULT_API_LINK: string;
  export const DEFAULT_API_HEADER: string;
  export const VIDEOS_API_LINK: string;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

interface LatestAnimeEpisode {
  video_id: string;
  category_id: string;
  title: string;
  category_image: string;
}

interface Anime {
  id: string;
  category_name: string;
  category_image: string;
}

interface AnimeDetails {
  id: string;
  category_name: string;
  category_image: string;
  category_description: string;
  category_genres: string;
  ano: string;
  count: string;
  off: string;
}

interface AnimeVideoInfos {
  response: string;
  video_id: string;
  title: string;
  location: string;
  sdlocation: string;
  isOpen?: boolean;
}

interface HistoryObject {
  video_id: string;
  video_title: string;
  anime_id: string;
  anime_title: string;
  anime_cover: string;
}

type ThemeName = 'dark' | 'light';
