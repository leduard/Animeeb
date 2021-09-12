enum ANIME_ROUTES_NAMES {
  home = 'Home',
  settings = 'Settings',
  details = 'Details',
  history = 'History',
}

enum ANIME_TAB_ROUTE_NAMES {
  home = 'Home',
  allAnimes = 'AllAnimes',
  favorites = 'Favorites',
}

export type AnimeDetailsRouteParams = {
  Anime: {
    title: string;
    cover: string;
    animeId: string;
    isFavorite: boolean;
  };
};

export { ANIME_ROUTES_NAMES, ANIME_TAB_ROUTE_NAMES };
