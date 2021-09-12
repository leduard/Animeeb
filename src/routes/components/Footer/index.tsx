import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';

import Text from '../../../components/Text';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={{ alignItems: 'center', backgroundColor: theme.primary }}>
      <Text font="bold">Footer</Text>
    </View>
  );
};

export default Footer;
