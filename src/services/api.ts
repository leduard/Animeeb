import axios from 'axios';

import { getRandomUserAgent } from '~/utils/userAgent';

const api = axios.create({
  baseURL: 'https://appanimeplus.tk/meuanimetv-40.php',
  headers: {
    'X-Requested-With': 'br.com.meuanimetv',
    'user-agent': getRandomUserAgent(),
  },
});

const getLatest = async (): Promise<LatestAnimeEpisode[] | undefined> => {
  try {
    const { data }: { data: LatestAnimeEpisode[] } = await api.get('', {
      params: { latest: '' },
    });

    return data;
  } catch (error) {
    return undefined;
  }
};

const getPopular = async (): Promise<Anime[] | undefined> => {
  try {
    const { data }: { data: Anime[] } = await api.get('', {
      params: { populares: '' },
    });

    return data;
  } catch (error) {
    return undefined;
  }
};

const searchAnime = async (search: string): Promise<Anime[] | undefined> => {
  try {
    const { data }: { data: Anime[] } = await api.get('', {
      params: { search },
    });

    return data;
  } catch (error) {
    return undefined;
  }
};

const getEpisodeStreamingData = async (
  video_id: string,
): Promise<AnimeStreamingData | undefined> => {
  try {
    const streamingDataR = Math.floor(Math.random() * 90000) + 10000;
    const timeToMatch = (Date.now() / 1000) * 2;
    const streamingDataToken = (timeToMatch * streamingDataR).toFixed();

    const { data }: { data: AnimeStreamingData[] } = await api.get('', {
      params: {
        episodios: video_id,
        token: streamingDataToken,
        r: streamingDataR,
      },
      headers: {
        'X-Auth':
          'VnM4ejB1dElLajZDZDhiSU02aGF0RmdDQWxXNDl3SEQzWjE2Ulg1K3ZOWjZkbjJXZjBqT2xnT0FVdnVwd2VjTEdkaS9KM0VlaHM4L1psc1J4R25SWHVpTGdjMVBvYUViTExhQXZpMzZGTytiVjh0SnQzUDVxL3ZVTDVZdkYwSDE1bFdFV1V4WGRwbUFFM0NJNjJOWEkvSndhbFVjZXNZYVRROGFKK2lkT2lEaU9nMElQT0hWTFlxNzlHajNPSVNhSjdnUDZTeldtbHVRaXlxMk5qSkFKV09NbDBIQkZhVTJYMitaaGtrMTd1OVJlSE5saVlGdUJOMk5TSGlBbzByYjFGeDN5N0Q2eHhjZFdzWS90b1JacFJtRGJ5QVdXLzBlTmhKK3UvVElGa3Q4T1Q5ODFZQjBzN0gxQVArZnY5NGo=',
      },
    });

    return data[0];
  } catch (error) {
    return undefined;
  }
};

const getAnimeEpisodes = async (
  anime_id: string,
): Promise<AnimeEpisode[] | undefined> => {
  try {
    const { data }: { data: AnimeEpisode[] } = await api.get('', {
      params: { cat_id: anime_id },
    });

    return data;
  } catch (error) {
    return undefined;
  }
};

const getAnimeDetails = async (
  anime_id: string,
): Promise<AnimeDetails | undefined> => {
  try {
    const { data }: { data: AnimeDetails[] } = await api.get('', {
      params: { info: anime_id },
    });

    return data[0];
  } catch (error) {
    return undefined;
  }
};

const getAnimeByCategory = async (
  category: string,
): Promise<Anime[] | undefined> => {
  try {
    const { data }: { data: Anime[] } = await api.get('', {
      params: { categoria: category },
    });

    return data;
  } catch (error) {
    return undefined;
  }
};

export {
  getLatest,
  getPopular,
  searchAnime,
  getEpisodeStreamingData,
  getAnimeEpisodes,
  getAnimeDetails,
  getAnimeByCategory,
};
