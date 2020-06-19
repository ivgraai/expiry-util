import { Appearance } from 'react-native-appearance';
import { ThemeColors } from 'react-navigation';

const tintColor = '#556B2F';
const backgroundColor = '#AED59E';

let themeColors = ('light' === Appearance.getColorScheme()) ? ThemeColors['light'] : ThemeColors['dark'];

export default {
  tintColor,
  backgroundColor,
  header: tintColor,
  errorText: '#FF6666',
  errorBackground: '#FFCCCC',
  bodyColor: themeColors.body,
  labelColor: themeColors.label
};
