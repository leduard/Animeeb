import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';

import Home from '~/pages/Home';
import Categories from '~/pages/Categories';
import Search from '~/pages/Search';
import Settings from '~/pages/Settings';
import Anime from '~/pages/Anime';

import { Text } from '~/components/Text';
import Background from '~/components/Background';

const {
  Navigator: BottomTabNavigator,
  Screen: BottomTabScreen,
} = createBottomTabNavigator();

const {
  Navigator: StackNavigator,
  Screen: StackScreen,
} = createStackNavigator();

interface RoutesProps {
  changeTheme(): void;
}

const MainRoutes: React.FC<RoutesProps> = ({ changeTheme }) => {
  const theme = useContext(ThemeContext);

  return (
    <BottomTabNavigator
      tabBarOptions={{
        showLabel: true,
        keyboardHidesTabBar: true,
        labelStyle: { fontSize: 12 },
        activeTintColor: '#0750b6',
        style: {
          zIndex: -1,
          backgroundColor: theme.secundaryColor,
          borderTopColor: theme.secundaryColor,
        },
      }}
      initialRouteName="Home"
      backBehavior="order">
      <BottomTabScreen
        options={{
          tabBarLabel: 'Início',
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={30} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <BottomTabScreen
        options={{
          tabBarLabel: 'Categorias',
          title: 'Categorias',
          tabBarIcon: ({ color }) => (
            <Icon name="format-list-bulleted" size={30} color={color} />
          ),
        }}
        name="Categories"
        component={Categories}
      />
      <BottomTabScreen
        options={{
          tabBarLabel: 'Buscar',
          title: 'Buscar',
          tabBarIcon: ({ color }) => (
            <Icon name="search" size={30} color={color} />
          ),
        }}
        name="Search"
        component={Search}
      />
      <BottomTabScreen
        options={{
          tabBarLabel: 'Ajustes',
          title: 'Ajustes',
          tabBarIcon: ({ color }) => (
            <Icon name="settings" size={30} color={color} />
          ),
        }}
        name="Settings">
        {() => <Settings changeTheme={changeTheme} />}
      </BottomTabScreen>
    </BottomTabNavigator>
  );
};

const Routes: React.FC<RoutesProps> = ({ changeTheme }) => {
  const theme = useContext(ThemeContext);

  return (
    <StackNavigator>
      <StackScreen options={{ headerShown: false }} name="Main">
        {() => <MainRoutes changeTheme={changeTheme} />}
      </StackScreen>
      <StackScreen
        options={{ headerShown: false }}
        component={Anime}
        name="Anime"
      />
    </StackNavigator>
  );
};

export default Routes;
