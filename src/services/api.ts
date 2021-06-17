import axios from 'axios';

const api = axios.create({
  baseURL: 'https://appanimeplus.tk/meuanimetv-40.php',
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
    const { data }: { data: AnimeStreamingData[] } = await api.get('', {
      params: { episodios: video_id },
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
