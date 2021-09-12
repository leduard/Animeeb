import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

import AnimesRoutes from './Animes.routes';

const StackNavigator = createStackNavigator();

interface MainRoutesProps {
  changeTheme(): void;
}

const MainRoutes: React.FC<MainRoutesProps> = ({ changeTheme }) => {
  const theme = useTheme();

  const renderAnimeRoutes = useCallback(
    () => <AnimesRoutes changeTheme={changeTheme} />,
    [changeTheme],
  );

  return (
    <StackNavigator.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.primary,
        },
      }}>
      <StackNavigator.Screen
        name="Animes"
        component={renderAnimeRoutes}
        options={{ headerShown: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default MainRoutes;
