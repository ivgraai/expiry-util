import { Appearance } from 'react-native-appearance';

const tintColor = '#556B2F';
const backgroundColor = '#AED59E';

/* let colorScheme = Appearance.getColorScheme();
let subscription = Appearance.addChangeListener(({ colorScheme }) => {
  ...
});
subscription.remove(); */

export default {
  tintColor,
  backgroundColor,
  header: tintColor,
  errorText: '#FF6666',
  errorBackground: '#FFCCCC',
  appColor: ('light' === Appearance.getColorScheme()) ? 'white' : 'black'
};
