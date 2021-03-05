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
}

interface AnimeStreamingData {
  video_id: string;
  category_id: string;
  title: string;
  location: string;
  locationsd: string;
  locationhd: string;
}

type AnimeRouteParams = {
  Anime: {
    title: string;
    cover: string;
    animeId: string;
  };
};
