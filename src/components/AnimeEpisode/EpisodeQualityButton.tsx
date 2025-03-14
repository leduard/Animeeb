import React, { useCallback, useState } from 'react';
import {
  Platform,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { Menu } from 'react-native-material-menu';
import Clipboard from '@react-native-clipboard/clipboard';
import SendIntentAndroid from 'react-native-send-intent';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import Text from '../Text';

import { fonts } from '../../styles';

import { AnimeDetailsRouteParams } from '../../utils/routes';
import Storage from '../../services/storage';

interface EpisodeQualityButtonProps {
  qualityTitle: string;
  episodeTitle: string;
  episodeId: string;
  episodeUrl?: string;
}

const EpisodeQualityButton: React.FC<EpisodeQualityButtonProps> = ({
  qualityTitle,
  episodeTitle,
  episodeId,
  episodeUrl,
}) => {
  const [visible, setVisible] = useState(false);

  const theme = useTheme();
  const { params } = useRoute<RouteProp<AnimeDetailsRouteParams, 'Anime'>>();

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const openLink = useCallback(async (link: string) => {
    if (Platform.OS === 'android')
      await SendIntentAndroid.openAppWithData(
        undefined as unknown as string,
        link,
        'video/*',
      );
    else {
      const supported = await Linking.canOpenURL(link);
      if (supported) await Linking.openURL(link);
    }

    Storage.addToHistory({
      anime_cover: params.cover,
      anime_id: params.animeId,
      anime_title: params.title.replace(/\sepis(o|ó)dio\s(.*)$/i, ''),
      video_id: episodeId,
      video_title: episodeTitle,
      watched_at: new Date().toISOString(),
    });
    hideMenu();
  }, []);

  const MenuButton: React.FC = React.memo(
    () => (
      <TouchableOpacity
        activeOpacity={episodeUrl ? 0.7 : 1}
        onPress={e => {
          e.stopPropagation();
          if (episodeUrl) showMenu();
        }}
        onLongPress={() => {
          if (episodeUrl) {
            Clipboard.setString(episodeUrl);
            ToastAndroid.show('Link copiado com sucesso!', ToastAndroid.LONG);
          }
        }}
        style={{
          width: 65,
          height: 30,
          borderRadius: 10,
          backgroundColor: episodeUrl
            ? theme.secondary
            : `${theme.secondary}60`,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          font="semiBold"
          style={{
            color: theme.primary,
            fontSize: 12,
            letterSpacing: 0.5,
            marginTop: 3,
          }}>
          {qualityTitle}
        </Text>
      </TouchableOpacity>
    ),
    () => false,
  );

  return (
    <Menu
      style={{
        marginTop: 25,
        borderRadius: 15,
        backgroundColor: theme.primary4,
      }}
      animationDuration={200}
      visible={visible}
      onRequestClose={hideMenu}
      anchor={<MenuButton />}>
      <TouchableOpacity
        onPress={() => {
          if (episodeUrl) openLink(episodeUrl);
        }}
        style={[styles.menuItem]}>
        <Text style={styles.menuItemText}>Assistir</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          return true;
        }}
        style={[styles.menuItem, {}]}>
        <Text
          style={{ ...styles.menuItemText, color: `${theme.textPrimary}25` }}>
          Download
        </Text>
      </TouchableOpacity>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    height: 45,
    width: 100,
  },
  menuItemText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.bold,
  },
});

export default React.memo(
  EpisodeQualityButton,
  (oldProps, newProps) => oldProps.episodeUrl === newProps.episodeUrl,
);
