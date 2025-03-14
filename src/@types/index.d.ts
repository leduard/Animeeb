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

interface AnimeEpisode {
  video_id: string;
  category_id: string;
  title: string;
  isOpen?: boolean;
  location?: string;
  sdlocation?: string;
}

interface AnimeVideoInfos {
  mS9wR2qY7pK7vX5n: string; // sd
  fV3gK5vU7uG6hU5e: string; // hd
  oU0dI2lL2tK2dR9f: string; // full hd
  video_id: string;
  category_id: string;
  title: string;
  sinop: string;
}

interface HistoryObject {
  video_id: string;
  video_title: string;
  anime_id: string;
  anime_title: string;
  anime_cover: string;
  watched_at: string;
}

type ThemeName = 'dark' | 'light';
