import axios from 'axios';
import { DEFAULT_API_LINK, DEFAULT_API_HEADER, VIDEOS_API_LINK } from '@env'; // eslint-disable-line

export const defaultApiLink = DEFAULT_API_LINK;
export const videosApiLink = VIDEOS_API_LINK;

export function getRandomUserAgent(): string {
  const userAgents = [
    'Mozilla/5.0 (Linux; Android 10; Android SDK built for x86 Build/QSR1.200715.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.185 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 7.0; SM-A310F Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36 OPR/42.7.2246.114996',
    'Mozilla/5.0 (Linux; Android 7.0; SAMSUNG SM-G955U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/5.4 Chrome/51.0.2704.106 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; U; Android 7.0; en-us; MI 5 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.146 Mobile Safari/537.36 XiaoMi/MiuiBrowser/9.0.3',
  ];

  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

const defaultApi = axios.create({
  baseURL: defaultApiLink,
  headers: {
    'X-Requested-With': DEFAULT_API_HEADER,
    'user-agent': getRandomUserAgent(),
  },
});

const videosApi = axios.create({
  baseURL: videosApiLink,
  headers: {
    'user-agent': getRandomUserAgent(),
  },
});

export const getLatest = async (): Promise<
  LatestAnimeEpisode[] | undefined
> => {
  try {
    const { data }: { data: LatestAnimeEpisode[] } = await defaultApi.get('', {
      params: { latest: '' },
    });

    return data;
  } catch (error) {
    return undefined;
  }
};

export const getPopular = async (): Promise<Anime[] | undefined> => {
  try {
    const { data }: { data: Anime[] } = await defaultApi.get('', {
      params: { populares: '' },
    });

    return data;
  } catch (error) {
    return undefined;
  }
};

export const getAllAnimes = async (): Promise<Anime[] | undefined> => {
  try {
    const { data }: { data: Anime[] } = await defaultApi.get('');

    return data;
  } catch (error) {
    return undefined;
  }
};

// export const searchAnime = async (
//   search: string,
// ): Promise<Anime[] | undefined> => {
//   try {
//     const { data }: { data: Anime[] } = await defaultApi.get('', {
//       params: { search },
//     });

//     return data;
//   } catch (error) {
//     return undefined;
//   }
// };

export const getAnimeDetails = async (
  anime_id: string,
): Promise<AnimeDetails | undefined> => {
  try {
    const { data }: { data: AnimeDetails[] } = await defaultApi.get('', {
      params: { info: anime_id },
    });

    return data[0];
  } catch (error) {
    return undefined;
  }
};

export const getAnimeVideoInfo = async (
  anime_id: string,
): Promise<AnimeVideoInfos[] | undefined> => {
  try {
    const { data }: { data: AnimeVideoInfos[] } = await videosApi.get('', {
      params: { action: 'category_videos', category_id: anime_id },
    });

    return data;
  } catch (error) {
    return undefined;
  }
};

// export const getAnimeByCategory = async (
//   category: string,
// ): Promise<Anime[] | undefined> => {
//   try {
//     const { data }: { data: Anime[] } = await defaultApi.get('', {
//       params: { categoria: category },
//     });

//     return data;
//   } catch (error) {
//     return undefined;
//   }
// };
