import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Alert, Platform } from 'react-native';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import Icon from '../../../assets/icons/icon.svg';
import Close from '../../../assets/icons/close.svg';
import Configure from '../../../assets/icons/configure.svg';
import Heart from '../../../assets/icons/heart.svg';
import FilledHeartIcon from '../../../assets/icons/heart_filled.svg';

import { AnimeDetailsRouteParams } from '../../../utils/routes';
import Storage from '../../../services/storage';

export interface HeaderProps {
  leftSide?: 'icon' | 'close';
  rightSide?: 'configure' | 'heart' | 'none';
}

const Header: React.FC<HeaderProps> = ({
  leftSide = 'icon',
  rightSide = 'configure',
}) => {
  const [isLeftPressed, setIsLeftPressed] = useState(false);
  const [isRightPressed, setIsRightPressed] = useState(false);
  const [, setFavorites] = useMMKVStorage<Anime[]>(
    Storage.FAVORITES_KEY_ID,
    Storage.getStorage(),
  );

  const { params } = useRoute<RouteProp<AnimeDetailsRouteParams, 'Anime'>>();

  const [isFavorite, setIsFavorite] = useState(params?.isFavorite);

  const navigation = useNavigation();
  const theme = useTheme();

  const onLeftPressed = () => {
    setIsLeftPressed(false);

    if (leftSide === 'close') {
      navigation.goBack();
    }
  };

  const onRightPressed = async () => {
    setIsRightPressed(false);

    if (rightSide === 'configure') {
      navigation.navigate('Settings');
      return;
    }
    if (rightSide === 'heart') {
      setFavorites(
        await Storage.handleFavorites({
          id: params?.animeId,
          category_name: params?.title?.replace(/\sepis(o|ó)dio\s(.*)$/i, ''),
          category_image: params?.cover,
        }),
      );
      setIsFavorite(prev => !prev);
    }
  };

  const renderIcons = (): Element => {
    return (
      <>
        <Pressable
          style={[
            styles.iconContainer,
            { borderColor: isLeftPressed ? theme.secondary : theme.primary5 },
          ]}
          onPressIn={() => setIsLeftPressed(true)}
          onPressOut={() => setIsLeftPressed(false)}
          delayLongPress={1000}
          onLongPress={() =>
            leftSide === 'icon' &&
            Alert.alert(
              'Mangás comming soon',
              'This are is under construction and will be release soon',
            )
          }
          onPress={onLeftPressed}>
          {leftSide === 'icon' ? (
            <Icon
              color={isLeftPressed ? theme.secondary : theme.textPrimary}
              width={50}
              height={50}
            />
          ) : (
            <Close
              color={isLeftPressed ? theme.secondary : theme.textPrimary}
              width={30}
              height={30}
            />
          )}
        </Pressable>
        {rightSide !== 'none' && (
          <Pressable
            style={[
              styles.iconContainer,
              {
                borderColor: isRightPressed ? theme.secondary : theme.primary5,
              },
            ]}
            onPressIn={() => setIsRightPressed(true)}
            onPressOut={() => setIsRightPressed(false)}
            onPress={onRightPressed}>
            {rightSide === 'configure' ? (
              <Configure
                color={isRightPressed ? theme.secondary : theme.textPrimary}
                width={25}
                height={25}
              />
            ) : (
              <>
                {isFavorite ? (
                  <FilledHeartIcon color={theme.error} width={25} height={25} />
                ) : (
                  <Heart
                    color={isRightPressed ? theme.secondary : theme.textPrimary}
                    width={25}
                    height={25}
                    style={{ marginTop: 3 }}
                  />
                )}
              </>
            )}
          </Pressable>
        )}
      </>
    );
  };

  return (
    <View
      style={{
        height: 120,
        padding: 35,
        backgroundColor: theme.primary,
        marginTop: Platform.OS === 'ios' ? 60 : 0,
      }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        {renderIcons()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: 1.5,
  },
});

export default Header;
