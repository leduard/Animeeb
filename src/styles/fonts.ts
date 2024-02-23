import { Platform } from 'react-native';

type TextWeight = {
  default: 'Poppins_Regular' | 'Poppins-Regular';
  thin: 'Poppins_Thin' | 'Poppins-Thin';
  light: 'Poppins_Light' | 'Poppins-Light';
  medium: 'Poppins_Medium' | 'Poppins-Medium';
  semiBold: 'Poppins_SemiBold' | 'Poppins-SemiBold';
  bold: 'Poppins_Bold' | 'Poppins-Bold';
};

const TextWeight: TextWeight = {
  default: Platform.OS === 'ios' ? 'Poppins-Regular' : 'Poppins_Regular',
  thin: Platform.OS === 'ios' ? 'Poppins-Thin' : 'Poppins_Thin',
  light: Platform.OS === 'ios' ? 'Poppins-Light' : 'Poppins_Light',
  medium: Platform.OS === 'ios' ? 'Poppins-Medium' : 'Poppins_Medium',
  semiBold: Platform.OS === 'ios' ? 'Poppins-SemiBold' : 'Poppins_SemiBold',
  bold: Platform.OS === 'ios' ? 'Poppins-Bold' : 'Poppins_Bold',
};

export default TextWeight;
