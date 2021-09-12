import MMKVStorage from 'react-native-mmkv-storage';

export default class Storage {
  private static MMKV: MMKVStorage.API;

  static INSTANCE_ID = 'ANIME_APP_STORAGE';

  static FAVORITES_KEY_ID = `${this.INSTANCE_ID}:FAVORITES`;

  static HISTORY_KEY_ID = `${this.INSTANCE_ID}:HISTORY`;

  static THEME_KEY_ID = `${this.INSTANCE_ID}:THEME`;

  static getStorage(): MMKVStorage.API {
    if (!this.MMKV)
      this.MMKV = new MMKVStorage.Loader()
        .withInstanceID(this.INSTANCE_ID)
        .initialize();

    return this.MMKV;
  }

  static async handleFavorites(animeTarget: {
    category_image: string;
    category_name: string;
    id: string;
  }): Promise<Anime[]> {
    const favorites = await this.getStorage().getArrayAsync<Anime>(
      this.FAVORITES_KEY_ID,
    );

    if (!favorites) {
      return [animeTarget];
    }

    const alreadyOnList = favorites?.some(fav => fav.id === animeTarget.id);

    if (alreadyOnList) {
      const newFavorites = favorites.filter(fav => fav.id !== animeTarget.id);

      return newFavorites;
    }

    return [...favorites, animeTarget];
  }

  static async addToHistory(episode: HistoryObject): Promise<void> {
    const history = await this.getStorage().getArrayAsync<HistoryObject>(
      this.HISTORY_KEY_ID,
    );

    if (!history) {
      await this.getStorage().setArrayAsync(this.HISTORY_KEY_ID, [episode]);
      return;
    }

    const alreadyOnList = history?.some(
      obj => obj.video_id === episode.video_id,
    );

    if (alreadyOnList) return;

    await this.getStorage().setArrayAsync(this.HISTORY_KEY_ID, [
      episode,
      ...history,
    ]);
  }

  static clearStorage(): void {
    Storage.getStorage().clearStore();

    // Storage.getStorage().removeItem(Storage.FAVORITES_KEY_ID);
    // Storage.getStorage().removeItem(Storage.HISTORY_KEY_ID);
    // Storage.getStorage().removeItem(Storage.THEME_KEY_ID);
  }
}
