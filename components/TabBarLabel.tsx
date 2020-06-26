import React from 'react';
import { Text, PixelRatio } from 'react-native';

import Colors from '../constants/Colors';

export default React.memo(function TabBarLabel(props: any) {
  return <Text style={{
      fontWeight: props.focused ? 'bold' : 'normal',
      color: Colors.tintColor,
      fontSize: (!props.focused ? 13 : 15) * PixelRatio.getFontScale()
    }}>
      {props.children}
    </Text>;
})
