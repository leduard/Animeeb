import React from 'react';
import { Text as RNText, StyleProp, TextStyle, TextProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { fonts } from '../../styles';

interface CustomTextProps extends TextProps {
  font?: 'default' | 'thin' | 'light' | 'medium' | 'semiBold' | 'bold';
}

const Text: React.FC<CustomTextProps> = ({
  font = 'default',
  children,
  ...rest
}) => {
  const theme = useTheme();

  const defaultStyle: StyleProp<TextStyle> = {
    fontFamily: fonts[font],
    fontSize: 18,
    color: theme.textPrimary,
  };

  const { style, ...props } = rest;

  return (
    <RNText
      style={{
        ...defaultStyle,
        ...(style as Record<string, unknown>),
      }}
      {...props}>
      {children}
    </RNText>
  );
};

export default Text;
