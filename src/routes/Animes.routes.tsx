import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  useRoute,
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { Platform } from 'react-native';
import { ANIME_ROUTES_NAMES, ANIME_TAB_ROUTE_NAMES } from '../utils/routes';

import Header, { HeaderProps } from './components/Header';

import AllAnimes from '../pages/Animes/AllAnimes';
import Home from '../pages/Animes/Home';
import Favorites from '../pages/Animes/Favorites';
import Details from '../pages/Animes/Details';
import History from '../pages/Animes/History';

import Settings from '../pages/Settings';

import BarsIcon from '../assets/icons/bars.svg';
import HomeIcon from '../assets/icons/home.svg';
import HeartIcon from '../assets/icons/heart.svg';

const TabNavigator = createMaterialTopTabNavigator();
const StackNavigator = createStackNavigator();

interface AnimesRoutesProps {
  changeTheme(): void;
}

const AnimesRoutes: React.FC<AnimesRoutesProps> = ({ changeTheme }) => {
  const theme = useTheme();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        header: ({ route }) => {
          const headerProps: HeaderProps = {
            leftSide: route.name === 'Home' ? 'icon' : 'close',
            rightSide:
              route.name === 'Settings' || route.name === 'History'
                ? 'none'
                : route.name === 'Home'
                ? 'configure'
                : 'heart',
          };

          return (
            <Header
              leftSide={headerProps.leftSide}
              rightSide={headerProps.rightSide}
            />
          );
        },
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <StackNavigator.Screen name={ANIME_ROUTES_NAMES.home}>
        {() => (
          <TabNavigator.Navigator
            tabBarPosition="bottom"
            initialRouteName={ANIME_TAB_ROUTE_NAMES.home}
            screenOptions={{
              tabBarStyle: {
                backgroundColor: theme.primary,
                padding: 5,
                paddingBottom: Platform.OS === 'ios' ? 20 : undefined,
                elevation: 0,
              },
              tabBarContentContainerStyle: { backgroundColor: theme.primary },
              tabBarIndicatorStyle: {
                display: 'none',
                backgroundColor: 'transparent',
              },
              tabBarPressOpacity: 0,
              tabBarPressColor: theme.primary,
            }}
            style={{
              backgroundColor: theme.primary,
            }}>
            <TabNavigator.Screen
              name={ANIME_TAB_ROUTE_NAMES.allAnimes}
              component={AllAnimes}
              options={{
                tabBarLabel: ({ focused }) => (
                  <TabBarLabel name="bars" focused={focused} />
                ),
              }}
            />
            <TabNavigator.Screen
              name={ANIME_TAB_ROUTE_NAMES.home}
              component={Home}
              options={{
                tabBarLabel: ({ focused }) => (
                  <TabBarLabel name="home" focused={focused} />
                ),
              }}
            />
            <TabNavigator.Screen
              name={ANIME_TAB_ROUTE_NAMES.favorites}
              component={Favorites}
              options={{
                tabBarLabel: ({ focused }) => (
                  <TabBarLabel name="favs" focused={focused} />
                ),
              }}
            />
          </TabNavigator.Navigator>
        )}
      </StackNavigator.Screen>

      <StackNavigator.Screen
        name={ANIME_ROUTES_NAMES.details}
        component={Details}
      />

      <StackNavigator.Screen name={ANIME_ROUTES_NAMES.settings}>
        {() => <Settings changeTheme={changeTheme} />}
      </StackNavigator.Screen>

      <StackNavigator.Screen
        name={ANIME_ROUTES_NAMES.history}
        component={History}
      />
    </StackNavigator.Navigator>
  );
};

const TabBarLabel: React.FC<{
  name: 'bars' | 'home' | 'favs';
  focused: boolean;
}> = ({ name, focused }) => {
  const theme = useTheme();

  const color = focused ? theme.textPrimary : theme.primary5;

  const Icon =
    name === 'bars' ? (
      <BarsIcon color={color} width={25} height={25} />
    ) : name === 'home' ? (
      <HomeIcon color={color} width={25} height={25} />
    ) : (
      <HeartIcon color={color} width={25} height={25} />
    );

  return Icon;
};

export default AnimesRoutes;
